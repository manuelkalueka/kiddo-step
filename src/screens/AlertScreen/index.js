import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {

  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 8,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 9,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto aperiam officiis consectetur libero, eius quasi minus quae. Blanditiis impedit aperiam illum, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    }
  ]

  return (
    <View style={styles.container}>

      {
        data == '' ? (
          <View style={styles.containerNo}>
            <Text style={styles.titleContainerNo}> Sem alertas disponíveis </Text>
          </View>
        ) : (
          <View style={styles.body}>
            <TouchableOpacity style={styles.btnMarkAll}>
              <Text style={styles.textBtnMark}>Marcar todas como lidas</Text>
            </TouchableOpacity>

            <FlatList
              style={styles.containerNoti}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.containerItem}>
                  <Text style={styles.itemDate}>{item.data}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubject}>{item.subject}</Text>

                  <FontAwesome5
                    name="check-circle"
                    size={12}
                    color={defaultStyle.colors.mainColorBlue}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )
      }


    </View>
  )
}
