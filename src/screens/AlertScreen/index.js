import { 
  View,
   Text,
   TextInput,
   TouchableOpacity,
    FlatList
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {

  const data = [
    {
      id: 1,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    },
    {
      id: 2,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    },
    {
      id: 3,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    },
    {
      id: 4,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    },
    {
      id: 5,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    },
    {
      id: 6,
      nome: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique repellendus exercitationem nam. Dolor, totam.',
      data: '08/04/2024'
    }
  ]

  return(
    <View style={styles.container}>

      <View style={styles.body}>
          <FlatList
            style={styles.containerNoti}
            data={data}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.containerItem}>
                <Text>{item.id}</Text>
                <Text>{item.nome}</Text>
                <Text>{item.data}</Text>
              </TouchableOpacity>
            )}
          />
      </View>

   </View>
  )
}
