import * as React from 'react';
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Layout } from '@ui-kitten/components';
import ButtonCalculator from './ButtonCalculator';
import { CalculatorCommonProps, DefaultCommonProps } from './interface';
import { formatNumber } from './utils';
import colors from '@utils/colors';

enum ActionEnum {
  CLEAR,
  DIVIDE,
  MULTIPLY,
  BACK,
  MINUS,
  PLUS,
  ENTER,
}

enum StackKindEnum {
  NUMBER,
  SIGN,
}

export interface CalculatorProps extends CalculatorCommonProps {
  /**
   * Show accept button after calculate.
   */
  hasAcceptButton?: boolean;

  /**
   * Container style.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Calculate button click event.
   */
  onCalc?: (value: number, text: string) => void;

  /**
   * Accept button click event.
   */
  onAccept?: (value: number, text: string) => void;
  onDone?: (value: number, text: string) => void;

  /**
   * Hide display text field.
   */
  hideDisplay?: boolean;
}

interface State {
  text: string;
  done: boolean;
}

interface CalcStack {
  value: string;
  kind: StackKindEnum;
  text: string;
  trailing: string;
}

interface ButtonSize {
  width: number;
  height: number;
  displayHeight: number;
}

export class Calculator extends React.Component<CalculatorProps, State> {
  static defaultProps: Partial<CalculatorProps> = DefaultCommonProps;

  calculated: boolean = false;
  stacks: CalcStack[] = [];

  constructor(props: CalculatorProps) {
    super(props);
    //this.calculate = this.calculate.bind(this);
    this.state = {
      text: '',
      done: false,
    };
  }

  getButtonSize(window: LayoutRectangle): ButtonSize {
    const { keyboardHeight, hideDisplay } = this.props;
    let { displayHeight, height, width } = this.props;
    if (!height) {
      height = window.height - window.y;
    }

    if (!width) {
      width = window.width - window.x;
    }

    width = (width as number) / 4;
    const containerHeight = height;

    if (keyboardHeight) {
      height = keyboardHeight / 5;
    } else {
      if (displayHeight || hideDisplay) {
        height = ((height as number) - (displayHeight || 0)) / 5;
      } else {
        height = (height as number) / 6;
      }
    }

    if (!displayHeight) {
      displayHeight = hideDisplay
        ? 0
        : keyboardHeight
        ? containerHeight - keyboardHeight
        : height;
    }

    return {
      width,
      height,
      displayHeight,
    };
  }

  componentDidMount() {
    this.clear(this.props.value);
  }

  render() {
    return this.renderMain();
  }

  renderMain() {
    const { text } = this.state;
    const {
      decimalSeparator,
      hasAcceptButton,
      hideDisplay,
      displayTextAlign,
      noDecimal,
      onDone,
    } = this.props;

    const done = this.state.done && hasAcceptButton;

    const handlePressButton = (value: any, decimalSeparator: any) => {
      if (this.calculated) {
        // clear answer replace with entered number
        this.calculated = false;
        this.stacks = [
          {
            kind: StackKindEnum.NUMBER,
            value: '',
            text: '',
            trailing: '',
          },
        ];
      }

      let stack = this.stacks[this.stacks.length - 1];

      // add new stack if current tag is a sign
      if (stack.kind === StackKindEnum.SIGN) {
        stack = {
          kind: StackKindEnum.NUMBER,
          value: '',
          text: '',
          trailing: '',
        };
        this.stacks.push(stack);
      }

      // evaluating decimal separator
      if (value === decimalSeparator) {
        if (!stack.value && !stack.text) {
          stack.text = '0';
          stack.value = '0';
        }
        if (
          stack.value.indexOf(decimalSeparator) > -1 ||
          stack.value === 'Infinity' ||
          stack.value === '-Infinity'
        ) {
          return;
        }
        stack.trailing = decimalSeparator;
      } else if (value === '0' || value === '000') {
        if (
          stack.value.indexOf(decimalSeparator as string) > -1 ||
          stack.trailing !== ''
        ) {
          stack.trailing = stack.trailing + value;
          value = '';
        }
      } else {
        if (stack.trailing) {
          value = stack.trailing + value;
          stack.trailing = '';
        }
      }

      // get editing value
      const val = parseFloat(
        (stack.value + value).replace(decimalSeparator as string, '.'),
      );

      // modify current stack
      stack.value = val.toString();
      stack.text = this.format(val);
      this.setText();
    };

    const calculate = () => {
      const {
        onCalc,
        onAccept,
        onDone,
        hasAcceptButton,
        roundTo = 2,
      } = this.props;

      if (!this.stacks.length) {
        this.clear();
        return;
      }

      const stack = this.stacks[this.stacks.length - 1];

      if (stack.kind === StackKindEnum.SIGN) {
        this.popStack();
      } else if (this.stacks.length === 1 && stack.value === '-') {
        this.clear();
        return;
      }

      // tslint:disable-next-line:no-eval
      const num = eval(this.stacks.map((x) => x.value).join('') || '0');
      const value = Math.round(num * 10 ** roundTo) / 10 ** roundTo;
      const text = this.format(value);

      this.stacks = [
        {
          kind: StackKindEnum.NUMBER,
          value: value.toString(),
          text,
          trailing: '',
        },
      ];

      this.setText(true, () => {
        if (onCalc) {
          onCalc(value, text);
        }

        if (hasAcceptButton && onAccept && this.state.done) {
          onAccept(value, text);
        }
        this.calculated = true;
      });
    };

    const handleDone = () => {
      const num = eval(this.stacks.map((x) => x.value).join('') || '0');
      const value = Math.round(num * 10 ** 2) / 10 ** 2;
      const x = this.format(value);

      onDone && onDone(value, x);
    };

    return (
      <View>
        <Layout style={styles.keyBoard}>
          <View style={styles.buttonView}>
            {this.renderActionButton('clear', ActionEnum.CLEAR)}
            {this.renderActionButton('plusSubtract', ActionEnum.DIVIDE)}
            {this.renderActionButton('delete', ActionEnum.BACK)}
            {this.renderActionButton(
              'plus',
              ActionEnum.PLUS,
              'medium',
              'action',
            )}
          </View>
          <View style={styles.buttonView}>
            {this.renderNumberButton('7')}
            {this.renderNumberButton('8')}
            {this.renderNumberButton('9')}
            {this.renderActionButton(
              'minus',
              ActionEnum.MINUS,
              'medium',
              'action',
            )}
          </View>
          <View style={styles.buttonView}>
            {this.renderNumberButton('4')}
            {this.renderNumberButton('5')}
            {this.renderNumberButton('6')}
            {this.renderActionButton(
              'multiply',
              ActionEnum.MULTIPLY,
              'medium',
              'action',
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.buttonView}>
              {this.renderNumberButton('1')}
              {this.renderNumberButton('2')}
              {this.renderNumberButton('3')}
              {this.renderActionButton(
                'divide',
                ActionEnum.DIVIDE,
                'medium',
                'action',
              )}
            </View>
            <View style={styles.buttonView}>
              <ButtonCalculator
                size="giant"
                onPress={() => handlePressButton('0', true)}
                icon={'0'}
              />
              {this.renderNumberButton(decimalSeparator as string)}
              <ButtonCalculator
                onPress={handleDone}
                icon={'checkMark'}
                size="medium"
                status="info"
              />
            </View>
          </View>
        </Layout>
      </View>
    );
  }

  renderNumberButton(value: string, size?: 'large' | 'medium') {
    const { decimalSeparator } = this.props;

    return (
      <ButtonCalculator
        icon={value === (decimalSeparator as string) ? 'dot' : value}
        size={size}
        onPress={() => {
          if (this.calculated) {
            this.calculated = false;
            this.stacks = [
              {
                kind: StackKindEnum.NUMBER,
                value: '',
                text: '',
                trailing: '',
              },
            ];
          }

          let stack = this.stacks[this.stacks.length - 1];

          // add new stack if current tag is a sign
          if (stack.kind === StackKindEnum.SIGN) {
            stack = {
              kind: StackKindEnum.NUMBER,
              value: '',
              text: '',
              trailing: '',
            };
            this.stacks.push(stack);
          }

          // evaluating decimal separator
          if (value === decimalSeparator) {
            if (!stack.value && !stack.text) {
              stack.text = '0';
              stack.value = '0';
            }
            if (
              stack.value.indexOf(decimalSeparator) > -1 ||
              stack.value === 'Infinity' ||
              stack.value === '-Infinity'
            ) {
              return;
            }
            stack.trailing = decimalSeparator;
          } else if (value === '0' || value === '000') {
            if (
              stack.value.indexOf(decimalSeparator as string) > -1 ||
              stack.trailing !== ''
            ) {
              stack.trailing = stack.trailing + value;
              value = '';
            }
          } else {
            if (stack.trailing) {
              value = stack.trailing + value;
              stack.trailing = '';
            }
          }

          // get editing value
          const val = parseFloat(
            (stack.value + value).replace(decimalSeparator as string, '.'),
          );

          // modify current stack
          stack.value = val.toString();
          stack.text = this.format(val);
          this.setText();
        }}
      />
    );
  }

  renderActionButton(
    value: string,
    action: ActionEnum,
    size?: 'large' | 'medium',
    status?: 'control' | 'info' | 'action',
  ) {
    return (
      <ButtonCalculator
        icon={value}
        size={size}
        status={status}
        onPress={() => {
          if (this.calculated) {
            // continue to use this answer
            this.calculated = false;
          }

          // tslint:disable-next-line:switch-default
          switch (action) {
            case ActionEnum.CLEAR:
              this.clear();
              break;

            case ActionEnum.PLUS:
              this.setSign('+');
              break;

            case ActionEnum.MINUS:
              this.setSign('-');
              break;

            case ActionEnum.MULTIPLY:
              this.setSign('*');
              break;

            case ActionEnum.DIVIDE:
              this.setSign('/');
              break;

            case ActionEnum.BACK:
              if (!this.stacks.length) {
                this.clear();
              } else {
                const stack = this.stacks[this.stacks.length - 1];

                if (stack.kind === StackKindEnum.SIGN) {
                  this.popStack();
                } else {
                  let { value, trailing } = stack;
                  const { decimalSeparator } = this.props;

                  if (
                    !value ||
                    (value.length === 2 && value.startsWith('-')) ||
                    value === '-' ||
                    value === 'Infinity' ||
                    value === '-Infinity'
                  ) {
                    this.clear();
                    return;
                  }

                  if (value === '0' && !trailing) {
                    return;
                  }

                  if (trailing !== '') {
                    stack.trailing = trailing.slice(0, trailing.length - 1);
                  } else {
                    if (value.length <= 1) {
                      this.popStack();
                    } else {
                      value = value.slice(0, value.length - 1);

                      while (value.slice(-1) === '0') {
                        value = value.slice(0, value.length - 1);
                        trailing = trailing + '0';
                      }

                      // keep decimal separator displayed
                      let sep = '';
                      if (value[value.length - 1] === '.') {
                        sep = this.props.decimalSeparator as string;
                      } else {
                        // skip trailing when no decimal separator found
                        value += trailing;
                        trailing = '';
                      }

                      // get editing value
                      const val = parseFloat(
                        value.replace(decimalSeparator as string, '.'),
                      );

                      stack.value = val.toString();
                      stack.text = this.format(val);
                      stack.trailing = sep + trailing;
                    }
                  }
                }
              }
              this.setText();

              break;
          }
        }}
      />
    );
  }

  popStack() {
    this.stacks.pop();
    if (!this.stacks.length) {
      this.clear();
    }
  }

  clear(value: number = 0) {
    this.stacks = [
      {
        kind: StackKindEnum.NUMBER,
        value: value.toString(),
        text: this.format(value),
        trailing: '',
      },
    ];
    this.setText();
  }

  setSign(sign: string) {
    const stack = this.stacks[this.stacks.length - 1];
    if (stack.kind === StackKindEnum.SIGN) {
      // only '-' sign allowed for first input
      if (this.stacks.length <= 1 && sign !== '-') {
        return;
      }
      stack.text = sign;
      stack.value = sign;
    } else {
      if (
        !stack.value ||
        stack.value === 'Infinity' ||
        stack.value === '-Infinity'
      ) {
        return;
      }

      if (sign === '-' && this.stacks.length === 1 && stack.value === '0') {
        stack.kind = StackKindEnum.SIGN;
        stack.text = sign;
        stack.value = sign;
      } else {
        this.stacks.push({
          kind: StackKindEnum.SIGN,
          text: sign,
          value: sign,
          trailing: '',
        });
      }
    }
    this.setText();
  }

  setText(done: boolean = false, callback?: () => void) {
    const text = this.stacks.map((s) => s.text + (s.trailing || '')).join(' ');
    if (!done) {
      done = this.stacks.length === 1;
    }

    this.setState({ text, done }, () => {
      const { onTextChange } = this.props;
      if (onTextChange) {
        onTextChange(text);
      }

      if (callback) {
        callback();
      }
    });
  }

  format(num: number) {
    const { decimalSeparator, thousandSeparator } = this.props;
    return formatNumber(
      num,
      decimalSeparator as string,
      thousandSeparator as string,
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexWrap: 'wrap',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '100%',
  },
  button: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  keyBoard: {
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 5 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
