import React, {useCallback, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ICON} from "@svg/Icon";
import colors from "@utils/colors";

interface Props{
  style?:object;
  isSquare?:boolean;
  onPress?:()=>void;
  disabled?:boolean;
  focused?:boolean;
}

export default ({disabled,style,focused,isSquare,onPress}:Props)=>{
  //const [focus,setFocus]= useState<boolean>(false);

  const _onPress = useCallback(()=>{
    //setFocus(!focus)
    onPress&&onPress();
  },[onPress])

  const boxStyle =  isSquare ? styles.squareBox : styles.circleStyle  ;
  const disabledStyle = disabled ? focused ? styles.disablesFocusStyle:styles.disableStyle:null;
  const focusStyle = focused && styles.focusStyle;

  return(
    <TouchableOpacity
      disabled={disabled}
      onPress={_onPress}
      activeOpacity={1}
      style={[styles.container,boxStyle,focusStyle,disabledStyle,style]}>
      {ICON.check}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
  },
  squareBox:{
    width:20,
    height:20,
    borderRadius:4,
    borderWidth:2,
    borderColor:colors.lightSlateGrey
  },
  circleStyle:{
    width:20,
    height:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:colors.lightSlateGrey
  },
  disablesFocusStyle:{
    backgroundColor:colors.aquaSqueeze,
    borderWidth:0,
  },
  disableStyle:{
    borderColor:colors.aquaSqueeze,
  },
  focusStyle:{
    backgroundColor:colors.emerald,
    borderWidth:0,
  },
})
