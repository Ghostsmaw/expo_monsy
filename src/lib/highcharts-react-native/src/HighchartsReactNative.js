import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const win = Dimensions.get('window');

let stringifiedScripts = {};
let cdnPath = 'https://code.highcharts.com';
let layoutHtml = `
<html>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Mukta' rel='stylesheet'>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    <style>
      #container {
        width:100%;
        height:100%;
        top:0;
        left:0;
        right:0;
        bottom:0;
        position:absolute;
        user-select: none;
        -webkit-user-select: none;
      }
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    </style>
    <script>
    const hcUtils = {
      parseOptions: function (chartOptions) {
        const parseFunction = this.parseFunction;
        const options = JSON.parse(chartOptions, function (val, key) {
          if (typeof key === 'string' && key.indexOf('function') > -1) {
            return parseFunction(key);
          } else {
            return key;
          }
        });
        return options;
      },
      parseFunction: function (fc) {
        const fcArgs = fc.match(/\((.*?)\)/)[1];
        const fcbody = fc.split('{');
        return new Function(fcArgs, '{' + fcbody.slice(1).join('{'));
      }
    };
    document.addEventListener('message', function (data) {
      Highcharts.charts[0].update(
        hcUtils.parseOptions(data.data),
        true,
        true,
        true
      );
    });
    window.addEventListener('message', function (data) {
      Highcharts.charts[0].update(
        hcUtils.parseOptions(data.data),
        true,
        true,
        true
      );
    });
    </script>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>
`;

export default class HighchartsReactNative extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    if (!!props.styles) {
      const userStyles = StyleSheet.flatten(props.styles);
      const { width: w, height: h } = userStyles;
      width = w;
      height = h;
    }
    return {
      width: width,
      height: height
    };
  }

  setHcAssets = async () => {
    try {
      await this.addScript('highcharts');
      await this.addScript('highcharts-more');
      await this.addScript('highcharts-3d');
      this.setState({ hcModulesReady: true })
    } catch (error) {
      console.error("Failed to fetch scripts or layout. " + error.message)
    }
  }

  addScript = async (name) => {
    const response = await fetch(
      `${cdnPath}/${name}.js`
    ).catch((error) => {
      throw error
    })
    stringifiedScripts[name] = await response.text();
  }

  constructor(props) {
    super(props);

    // extract width and height from user styles
    const userStyles = StyleSheet.flatten(props.styles);

    this.state = {
      width: userStyles.width || win.width,
      height: userStyles.height || win.height,
      chartOptions: props.options,
      modules: props.modules || [],
      setOptions: props.setOptions || {},
      hcModulesReady: false
    };
    this.webviewRef = null;

    this.setHcAssets();
  }

  componentDidUpdate() {
    this.webviewRef && this.webviewRef.postMessage(this.serialize(this.props.options, true));
  }

  componentDidMount() {
    // Did mount
  }
  /**
   * Convert JSON to string. When is updated, functions (like events.load) 
   * is not wrapped in quotes.
   */
  serialize(chartOptions, isUpdate) {
    var hcFunctions = {},
      serializedOptions,
      i = 0;

    serializedOptions = JSON.stringify(chartOptions, function (val, key) {
      var fcId = '###HighchartsFunction' + i + '###';

      // set reference to function for the later replacement
      if (typeof key === 'function') {
        hcFunctions[fcId] = key.toString();
        i++;
        return isUpdate ? key.toString() : fcId;
      }

      return key;
    });

    // replace ids with functions.
    if (!isUpdate) {
      Object.keys(hcFunctions).forEach(function (key) {
        serializedOptions = serializedOptions.replace(
          '"' + key + '"',
          hcFunctions[key]
        );
      });
    }

    return serializedOptions;
  }

  render() {
    if (!this.state.hcModulesReady) {
      return <View><Text>{"Loading.."}</Text></View>
    }

    const setOptions = this.state.setOptions;
    const runFirst = `
      window.data = \"${this.props.data ? this.props.data : null}\";
      var modulesList = ${JSON.stringify(this.state.modules)};
      var readable = ${JSON.stringify(stringifiedScripts)}
      function loadScripts(file, callback, redraw) {
        var hcScript = document.createElement('script');
        hcScript.innerHTML = readable[file]
        document.body.appendChild(hcScript);
        if (callback) {
            callback.call();
        }
        if (redraw) {
            Highcharts.setOptions('${this.serialize(setOptions)}');
            Highcharts.chart("container", ${this.serialize(this.props.options)});
        }
      }
      loadScripts('highcharts', function () {
        var redraw = modulesList.length > 0 ? false : true;
        loadScripts('highcharts-more', function () {
          if (modulesList.length > 0) {
            for (var i = 0; i < modulesList.length; i++) {
              if (i === (modulesList.length - 1)) {
                redraw = true;
              } else {
                redraw = false;
              }
              loadScripts(modulesList[i], undefined, redraw, true);
            }
          }
        }, redraw);
      }, false);
    `;

    // Create container for the chart
    return (
      <View
        style={[
          this.props.styles,
          { width: this.state.width, height: this.state.height }
        ]}
      >
        <WebView
          ref={ref => { this.webviewRef = ref }}
          onMessage={this.props.onMessage ? (event) => this.props.onMessage(event.nativeEvent.data) : () => { }}
          source={{html: layoutHtml}}
          injectedJavaScript={runFirst}
          originWhitelist={["*"]}
          automaticallyAdjustContentInsets={true}
          allowFileAccess={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          scrollEnabled={false}
          mixedContentMode='always'
          allowFileAccessFromFileURLs={true}
          startInLoadingState={this.props.loader}
          style={this.props.webviewStyles}
          androidHardwareAccelerationDisabled
          {...this.props.webviewProps}
        />
      </View>
    )
  }
}
