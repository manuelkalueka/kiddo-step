import {StyleSheet} from 'react-native';
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    width:'100%',
    height:'100%',
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },

  headerLogin:{
    //
  },


  containerInput: {
    width: "100%",
    padding:defaultStyle.inputs.container,
    borderWidth:1,
    borderColor:defaultStyle.colors.grayAccent1,
    flexDirection: 'row',
    borderRadius:defaultStyle.borderRadio.borderRadioInput,
    marginVertical: 10,
  },

  textInput: {
    fontSize:defaultStyle.sizes.inputText,
    paddingLeft:10,
    width:'90%'
  },

  showpasswordIcon: {
    position: 'absolute',
    right:5,
    top: 18
  },

  buttonSigIn: {
    marginTop:10,
    width:'100%',
    padding:defaultStyle.inputs.container,
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
    alignSelf: 'center'
  },

  textForgotPassword: {
    fontSize: defaultStyle.sizes.mainLabels,
    fontWeight:'bold',
    color: defaultStyle.colors.mainColorBlue
  },

  containerNewAccount: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  textDoYouNeed: {
    fontSize:defaultStyle.sizes.mainLabels,
    color: defaultStyle.colors.grayAccent3,
  },

  textCreateAccount: {
    fontSize:defaultStyle.sizes.mainLabels,
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