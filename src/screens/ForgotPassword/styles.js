import { StyleSheet } from 'react-native'
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 1,
    backgroundColor: defaultStyle.colors.white
    // justifyContent: 'center'
  },

  containerModal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerCode: {
    backgroundColor: defaultStyle.colors.white,
    width: '95%',
    height: 200,
    borderRadius: defaultStyle.borderRadio.normal
  },

  containerInputsCode: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  code: {
    marginTop: '10%',
    borderWidth: 1,
    borderColor: defaultStyle.colors.mainColorBlue,
    height: 80,
    width: 69,
    borderRadius: defaultStyle.borderRadio.normal,
    marginLeft: 5,
    textAlign: 'center',
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: 'bold',
    color: defaultStyle.colors.info
  },

  buttonConfirmation: {
    alignSelf: 'center',
    padding: Platform.OS == 'ios' ? defaultStyle.inputs.container : 10,
    backgroundColor: defaultStyle.colors.mainColorBlue,
    marginTop: 30,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: defaultStyle.borderRadio.normal
  },
  textButtonConfirmation: {
    fontSize: defaultStyle.sizes.button,
    fontWeight: 'bold',
    color: defaultStyle.colors.white,
  },

  titleForgot: {
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50
  },

  subtitleForgot: {
    textAlign: 'center',
    color: defaultStyle.colors.grayAccent4,
    marginBottom: 25
  },

  containerInputs: {
    width: "90%",
    padding: Platform.OS == 'ios' ? defaultStyle.inputs.container : 12,
    flexDirection: 'row',
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    marginVertical: 10,
    alignSelf: 'center',
    // backgroundColor: '#2394f11e',
    borderWidth: 1,
    borderColor: defaultStyle.colors.grayAccent1,
  },

  textInput: {
    fontSize: defaultStyle.sizes.inputText,
    paddingLeft: 10,
    width: '90%'
  },

  ButtonSendCode: {
    width: "90%",
    padding: Platform.OS == 'ios' ? defaultStyle.inputs.container : 13,
    borderColor: defaultStyle.colors.grayAccent1,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: defaultStyle.colors.mainColorBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },

  msgAlertError: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: 'flex-start',
    marginLeft: '5%'
  },

  textButtonSendCode: {
    color: defaultStyle.colors.white,
    fontSize: defaultStyle.sizes.button,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export { styles }