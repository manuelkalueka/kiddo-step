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
    paddingLeft: 1,
    paddingRight: 3
  },

  containerItens: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 5
  },

  containerIcon: {
    backgroundColor: '#fff1f1',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 10
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
    color: defaultStyle.colors.dark
  }

 //defaultStyle.colors.grayAccent3



})

export {styles}