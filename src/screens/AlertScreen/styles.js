import { StyleSheet } from 'react-native'
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.mainColorBlue,
  },

  header: {
    width: '95%',
    marginVertical: '5%',
    height: 100,
    alignSelf: 'center',
    borderRadius: defaultStyle.borderRadio.borderRadioButton.small,
    backgroundColor: '#0005',
    paddingHorizontal: '5%',
    alignItems: 'flex-start',
    paddingVertical: '1%'
  },

  titleSreen: {
    fontSize: defaultStyle.sizes.title,
    textAlign: 'center',
    fontWeight: 'bold',
    color: defaultStyle.colors.white
  },

  iconAlert: {
    padding: 13,
    backgroundColor: defaultStyle.colors.danger,
    width:60,
    height: 60,
    borderRadius: defaultStyle.borderRadio.max
  },

  body: {
    width: '100%',
    height: '100%',
    backgroundColor: defaultStyle.colors.whiteSmooke,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderTopLeftRadius: defaultStyle.borderRadio.big,
    borderTopRightRadius: defaultStyle.borderRadio.big
  },

  buttonReadNotif: {
    width: '100%',
    padding: 5,
    backgroundColor: defaultStyle.colors.white,
    borderTopLeftRadius: defaultStyle.borderRadio.big,
    borderTopRightRadius: defaultStyle.borderRadio.big,
    marginBottom: 10
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
    margin: 2
  },

  mainNotifications: {
    width: '100%',
    backgroundColor: defaultStyle.colors.white,
    height: '50%',
    paddingVertical: '5%',
    paddingHorizontal: '5%'
  },

  notification: {
    width: '100%',
    padding: 30,
    backgroundColor: defaultStyle.colors.grayAccent1,
    borderRadius: defaultStyle.borderRadio.normal,
    marginBottom: 5
  }
})

export {styles}