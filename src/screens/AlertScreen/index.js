import ApiMananger from "../../services/api";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";

import LoadingComponent from "../../components/LoadingComponent";

import { formatDate } from '../../../utils/format-date'

import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'

import { styles } from './styles'
import defaultStyle from "../../defaultStyle";

export default function AlertScreen() {
  const [colorIcon, setColorIcon] = useState('#ff6f48')
  const [refreshingData, setRefreshingData] = useState(false)
  const [data, setData] = useState([])
  const [lodadingAlert, setLoadingAlert] = useState(true)

  useEffect(() => {
    const geoFecingId = '662e46543fa5166d5e52a999'

    ApiMananger.get(`/alertSchedule/${geoFecingId}`)
      .then(res => {
        setData(res.data)
        setLoadingAlert(false)
      })
      .catch(error => console.log(error))
    //console.log()

  }, [])

  const handlerMarkAll = () => {
    setColorIcon('#f5f5f5')
  }


  return lodadingAlert ? <LoadingComponent /> : (

    <View style={styles.container}>
      {
        data == '' ? (
          <View style={styles.containerNo}>
            <Text style={styles.titleContainerNo}> Sem alertas disponíveis </Text>
          </View>
        ) : (

          <View style={styles.body}>

            <TouchableOpacity style={styles.btnMarkAll} onPress={() => handlerMarkAll()}>
              <Text style={styles.textBtnMark}>Marcar todas como lidas</Text>
            </TouchableOpacity>

            <FlatList
              style={styles.containerNoti}
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.containerItens}>
                  <View style={styles.containerIcon}>
                    <FontAwesome5 name='bell' size={25} color={defaultStyle.colors.defaultIcon} />
                  </View>

                  <TouchableOpacity style={styles.containerItem}>
                    <Text style={styles.itemDate}>{formatDate(item.createdAt)}</Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubject}>{item.type}</Text>

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
