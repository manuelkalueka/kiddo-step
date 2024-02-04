import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {
  return(
    <View style={styles.container}>
      <View style={styles.header}>
          <FontAwesome5
              style={styles.iconAlert}
              name='exclamation-triangle'
              size={30}
              color={'#fff'}
            />
            <Text style={styles.titleSreen}>Configuração de alerta</Text>
      </View>

        <TouchableOpacity style={styles.buttonHistoric}>
         
            <FontAwesome5
              name='history'
              size={25}
              color={defaultStyle.colors.white}
            />
             <Text style={styles.textButtonHistoric}>
            Histórico de alertas
          </Text>
        </TouchableOpacity>

      <View style={styles.body}>
        <TextInput
          placeholder="Tipo de alerta"
        />
       

      </View>

   </View>
  )
}
