import {Platform, StyleSheet} from 'react-native';
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    width:'100%',
    height:'100%',
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },

  headerLogin:{
    width: '100%',
    height: '28%',
  },

  imageLogin: {
    width: '100%',
    height: '100%'
  },

  form: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: defaultStyle.borderRadio.big,
    borderTopRightRadius: defaultStyle.borderRadio.big,
    backgroundColor: defaultStyle.colors.white
  },

  subTitleLogin: {
    padding: 10,
    fontSize: defaultStyle.sizes.title,
    color: defaultStyle.colors.grayAccent4
  },


  containerInput: {
    width: "100%",
    padding:Platform.OS == 'ios'?defaultStyle.inputs.container:10,
    flexDirection: 'row',
    borderRadius:defaultStyle.borderRadio.borderRadioInput,
    marginVertical: 10,
    backgroundColor: '#2394f11e' //#2394f128 //#2394f142
  },

  textInput: {
    fontSize:defaultStyle.sizes.inputText,
    paddingLeft:10,
    width:'83%',
    color: '#0009'
  },

  showpasswordIcon: {
    position: 'absolute',
    right:5,
    top:Platform.OS =='ios'?18:10
  },

  buttonSigIn: {
    marginTop:10,
    width:'100%',
    padding:Platform.OS == 'ios'?defaultStyle.inputs.container:10,
    borderColor:defaultStyle.colors.blueLightColor1,
    borderRadius:defaultStyle.borderRadio.borderRadioInput,
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
    marginBottom:10,
    alignSelf: 'flex-end'
  },

  textForgotPassword: {
    fontSize: Platform.OS == 'ios'?defaultStyle.sizes.mainLabels:defaultStyle.sizes.inputLabels,
    fontWeight:'bold',
    color: defaultStyle.colors.mainColorBlue
  },

  containerNewAccount: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  textDoYouNeed: {
    fontSize: Platform.OS == 'ios'?defaultStyle.sizes.mainLabels:defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.grayAccent3,
  },

  textCreateAccount: {
    fontSize: Platform.OS == 'ios'?defaultStyle.sizes.mainLabels:defaultStyle.sizes.inputLabels,
    fontWeight: 'bold',
    color: defaultStyle.colors.mainColorBlue
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