import { StyleSheet } from "react-native";
import defaultStyle from "../../../../defaultStyle"

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: defaultStyle.sizes.title,
    fontWeight: "bold",
    color:defaultStyle.colors.dark,
    marginVertical:5
  },

  description:{
    color:defaultStyle.colors.grayAccent2,
    fontSize:defaultStyle.sizes.subtitle,
    marginBottom:50,
  }
})

export default styles;