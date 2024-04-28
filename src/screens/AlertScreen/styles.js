import { Platform, StyleSheet } from 'react-native'
import defaultStyle from '../../defaultStyle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white
  },

  body: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
    backgroundColor: defaultStyle.colors.white,
  },

  containerNoti: {
    
  },

  containerItens: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderColor: defaultStyle.colors.mainColorBlue1,
  },

  containerIcon: {
    backgroundColor: '#fff1f1',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },

  containerItem: {
    paddingBottom: 10,
    padding: 15
  },

  itemDate: {
    fontSize: defaultStyle.sizes.bodyText
  },

  itemTitle: {
    fontSize: defaultStyle.sizes.mainLabels,
    fontWeight: 'bold',
    color: defaultStyle.colors.black2
  },

  itemSubject: {
    fontSize: defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.grayAccent5,
    textAlign: 'justify',
    paddingRight: 12
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
    paddingTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyle.colors.white,
  },

  titleContainerNo: {
    fontSize: defaultStyle.sizes.title,
    fontWeight: 'bold',
    color: defaultStyle.colors.grayAccent1
  }

 //defaultStyle.colors.grayAccent3



})

export {styles}