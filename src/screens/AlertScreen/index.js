import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {
  return(
    <View style={styles.container}>
      <View style={styles.body}>

        <TouchableOpacity style={styles.buttonReadNotif} activeOpacity={0.4}>
          <Text style={styles.textButtonReadNotif}>Marcar todas como visualizadas</Text>
        </TouchableOpacity>

        <View style={styles.mainNotifications}>
          <ScrollView>
            <Text style={styles.labelNotif}>Hoje</Text>
              <View style={styles.notification}></View>
              <View style={styles.notification}></View>
              <View style={styles.notification}></View>

              <Text style={styles.labelNotif}>Ontem</Text>
              <View style={styles.notification}></View>
              <View style={styles.notification}></View>
              <View style={styles.notification}></View>
              <View style={styles.notification}></View>

          </ScrollView>
        </View>
      </View>

   </View>
  )
}
