import { StyleSheet } from 'react-native'
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.mainColorBlue,
  },

  body: {
    width: '100%',
    height: '100%',
    backgroundColor: defaultStyle.colors.grayAccent1,
  },

  buttonReadNotif: {
    alignSelf: 'center',
    width: '98%',
    padding: 5,
    backgroundColor: defaultStyle.colors.white,
    borderTopLeftRadius: defaultStyle.borderRadio.normal,
    borderTopRightRadius: defaultStyle.borderRadio.normal,
    marginBottom: 4,
    marginVertical: '1%'
  },

  textButtonReadNotif: {
    fontSize: defaultStyle.sizes.inputLabels,
    fontWeight: 'bold',
    color: defaultStyle.colors.mainColorBlue,
    textAlign: 'center'
  },

  labelNotif: {
    fontSize: defaultStyle.sizes.label,
    fontWeight: 'bold',
    padding: 5,
    color: 'gray'
  },

  mainNotifications: {
    width: '100%',
    backgroundColor: defaultStyle.colors.white,
    height: '94%',
    paddingVertical: '5%'
  },

  notification: {
    width: '100%',
    padding: 30,
    backgroundColor: defaultStyle.colors.mainColorBlue1,
    borderRadius: defaultStyle.borderRadio.normal,
    marginBottom: 5
  }
})

export {styles}