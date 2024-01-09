import {StyleSheet} from 'react-native';
import defaultStyle from '../../../DefaultStyle'

const styles = StyleSheet.create({
  title: {
    color: defaultStyle.colors.white,
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: 'bold'
  },

  subTitle: {
    color: defaultStyle.colors.white,
    fontSize: defaultStyle.sizes.subtitle,
    marginBottom:15
}
})

export {styles}