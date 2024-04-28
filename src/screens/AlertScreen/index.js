import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from "react-native";

import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {
  const [ colorIcon , setColorIcon ] = useState('#ff6f48')
  const [ refreshingData , setRefreshingData] = useState(false)

  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto ',
      data: '08/04/2024'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto',
      data: '08/04/2024'
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto',
      data: '08/04/2024'
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto, cupiditate laudantium error iusto consectetur enim?',
      data: '08/04/2024'
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto ',
      data: '08/04/2024'
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto ',
      data: '08/04/2024'
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto',
      data: '08/04/2024'
    },
    {
      id: 8,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto',
      data: '08/04/2024'
    },
    {
      id: 9,
      title: 'Lorem ipsum dolor sit',
      subject: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, quasi! Laborum iusto',
      data: '08/04/2024'
    }
  ]

  const handlerMarkAll = () => {
    setColorIcon('#f5f5f5')
  }


  return (
    
    <View style={styles.container}>
      {
        data == '' ? (
          <View style={styles.containerNo}>
            <Text style={styles.titleContainerNo}> Sem alertas disponíveis </Text>
          </View>
        ) : (
          <View style={styles.body}>
            <TouchableOpacity style={styles.btnMarkAll} onPress={()=>handlerMarkAll()}>
              <Text style={styles.textBtnMark}>Marcar todas como lidas</Text>
            </TouchableOpacity>

            <FlatList
              style={styles.containerNoti}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.containerItens}>
                  <View style={styles.containerIcon}>
                  <FontAwesome5 name='bell' size={25} color={defaultStyle.colors.defaultIcon}/>
                  </View>

                <TouchableOpacity style={styles.containerItem}>
                  <Text style={styles.itemDate}>{item.data}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubject}>{item.subject}</Text>

                  <FontAwesome5
                    name="check-circle"
                    size={12}
                    color={colorIcon}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )
      }
    </View>
   
  )
}
