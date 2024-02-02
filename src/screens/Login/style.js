import {StyleSheet} from 'react-native';
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  containerLogin: {
    paddingTop:50,
    backgroundColor: defaultStyle.colors.white,
    width:'100%',
    height:'100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    alignItems:'center'
  },

  containerTxtEmail: {
    width:defaultStyle.Widths.widthInput,
    height:defaultStyle.heights.heightInput,
    borderWidth:1,
    borderColor:defaultStyle.colors.blueLightColor1,
    padding:10,
    flexDirection: 'row',
    borderRadius:10,
    marginBottom:10
  },

  txtEmail: {
    fontSize:defaultStyle.sizes.inputText,
    paddingLeft:5,
    width:'100%'
  },

  containerTxtPassword: {
    marginTop:10,
    width:defaultStyle.Widths.widthInput,
    height:defaultStyle.heights.heightInput,
    borderWidth:1,
    borderColor:defaultStyle.colors.blueLightColor1,
    padding:10,
    flexDirection: 'row',
    borderRadius:10,
    marginBottom:10
  },

  txtPassword: {
    fontSize:defaultStyle.sizes.inputText,
    paddingLeft:5,
    width:'94%'
  },

  buttonSigIn: {
    marginTop:10,
    width:defaultStyle.Widths.widthInput,
    height:defaultStyle.heights.heightInput,
    borderColor:defaultStyle.colors.blueLightColor1,
    padding:10,
    borderRadius:10,
    backgroundColor: defaultStyle.colors.mainColorBlue,
    marginBottom:15
  },

  TextSigIn: {
    color: defaultStyle.colors.white,
    fontSize: defaultStyle.sizes.button,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  containerForgotPassword: {
    marginBottom:10
  },

  textForgotPassword: {
    fontSize: defaultStyle.sizes.inputLabels,
    fontWeight:'bold',
    color: defaultStyle.colors.blueDarkColor4
  },

  containerNewAccount: {
    flexDirection: 'row'
  },

  textDoYouNeed: {
    fontSize:defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.grayAccent3
  },

  textCreateAccount: {
    fontSize:defaultStyle.sizes.inputLabels,
    fontWeight: 'bold',
    color: defaultStyle.colors.blueDarkColor4
  },

  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    fontWeight: 'bold',
    alignSelf:'flex-start',
    marginLeft:'2.5%'
  }
})

export {styles}