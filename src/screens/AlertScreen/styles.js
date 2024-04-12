import { StyleSheet } from 'react-native'
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
  },

  body: {
    width: '100%',
    height: '100%',
    backgroundColor: defaultStyle.colors.white,
  },

  containerNoti: {
    padding: 10,
  },

  containerItem: {
    borderBottomWidth: .5,
    paddingBottom: 10,
    borderColor: defaultStyle.colors.mainColorBlue1
  },

  itemDate: {
    fontSize: defaultStyle.sizes.bodyText
  },

  itemTitle: {
    fontSize: defaultStyle.sizes.mainLabels,
    fontWeight: 'bold',
    color: defaultStyle.colors.dark
  },

  itemSubject: {
    fontSize: defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.grayAccent4,
    textAlign: 'justify'
  },

  btnMarkAll: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5'
  },

  textBtnMark: {
    fontSize: defaultStyle.sizes.inputText,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'right',
    color: defaultStyle.colors.mainColorBlue
  },

  containerNo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  titleContainerNo: {
    fontSize: defaultStyle.sizes.title,
    fontWeight: 'bold',
    color: defaultStyle.colors.dark
  }

 //defaultStyle.colors.grayAccent3



})

export {styles}