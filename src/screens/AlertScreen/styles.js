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

  buttonHistoric: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: defaultStyle.borderRadio.cards[0],
    backgroundColor: defaultStyle.colors.accentColor3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 180,
    marginHorizontal: '5%',
    marginBottom: '5%'
  },

  textButtonHistoric: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
    marginLeft: 5,
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
    backgroundColor: defaultStyle.colors.white,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderTopLeftRadius: defaultStyle.borderRadio.big,
    borderTopRightRadius: defaultStyle.borderRadio.big
  }
})

export {styles}