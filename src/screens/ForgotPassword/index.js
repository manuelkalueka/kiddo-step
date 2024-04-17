import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ActivityIndicator
} from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import * as Notify from 'expo-notifications'

import { styles } from './styles'
import defaultStyle from '../../defaultStyle'
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard"

const schema1 = yup.object({
  email: yup.string().email('Por favor informe um email válido').required('Campo obrigatório'),
})

//Permitindo o uso do expo notication
Notify.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export default function ForgotPassword() {

  const navigation = useNavigation();

  //States
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [code4, setCode4] = useState('')

  const [visModal, setVisModal] = useState(false)
  const [active, SetActive] = useState(true)

  //Função que manda a notification no user
  const handlerNotify = async () => {
    await Notify.scheduleNotificationAsync({
      content: {
        title: 'Confirmação de email',
        body: 'Confirmamos o teu email através de um código de segurança enviado',
        data: [],
      },
      trigger: {
        seconds:1
      }
    })
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema1)
  })

  const sendData = (data) => {
    handlerNotify()
    setVisModal(true)

    setTimeout(() => {
      SetActive(false)
      //Preenchimento automático dos inputs de code
      const max = 9
      const min = 0

      //Constantes com as funcões para gerarem números aleatórios
      const code1 = Math.floor(Math.random() * (max - min + 1) + min)
      const code2 = Math.floor(Math.random() * (max - min + 1) + min)
      const code3 = Math.floor(Math.random() * (max - min + 1) + min)
      const code4 = Math.floor(Math.random() * (max - min + 1) + min)

      //Setando os números gerados no states
      setCode1(code1)
      setCode2(code2)
      setCode3(code3)
      setCode4(code4)
    }, 2000)
  }

  const dismissModal = () => {
    setVisModal(false)
  }

  const verifyCode = (data) => {
    SetActive(false)
    navigation.navigate('CreatePassword')

  }

  return (
    <TouchableWithoutFeedback onPress={() => handleDisableKeyboard(Keyboard)}>
      <View style={styles.container}>

        <Modal
          animationType='none'
          transparent={true}
          visible={visModal}
        >
          <View style={styles.containerModal}>

            <View style={styles.containerCode}>
              <View style={styles.containerInputsCode}>

                <TouchableOpacity style={styles.btnClose} onPress={dismissModal}>
                  <Text style={styles.txtBtnClose}>Fechar</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.code}
                  keyboardType='numeric'
                  maxLength={1}
                  value={String(code1)}
                />

                <TextInput
                  style={styles.code}
                  keyboardType='numeric'
                  maxLength={1}
                  value={String(code2)}
                />

                <TextInput
                  style={styles.code}
                  keyboardType='numeric'
                  maxLength={1}
                  value={String(code3)}
                />

                <TextInput
                  style={styles.code}
                  keyboardType='numeric'
                  maxLength={1}
                  value={String(code4)}
                />

              </View>

              <TouchableOpacity style={styles.buttonConfirmation} onPress={handleSubmit(verifyCode)}>
                {
                  active == true ? (
                    <ActivityIndicator
                      size={'small'}
                      color={'orange'}
                    />
                  ) : (
                    <Text style={styles.textButtonConfirmation}>Confirmar</Text>
                  )
                }
              </TouchableOpacity>
            </View>

          </View>

        </Modal>

        <Text style={styles.titleForgot}>Insira o teu email</Text>
        <Text style={styles.subtitleForgot}>Ao inserir o teu email enviaremos para você um código de recuperação da sua senha</Text>

        <View style={styles.containerInputs}>
          <FontAwesome5
            name='envelope'
            size={25}
            color={defaultStyle.colors.mainColorBlue}
          />

          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                placeholder='Digite o email da conta'
                autoCapitalize='none'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}

              />)} />
        </View>
        {
          errors.email && <Text style={styles.msgAlertError}>{errors.email?.message}</Text>
        }

        <TouchableOpacity style={styles.ButtonSendCode} onPress={handleSubmit(sendData)}>
          <Text style={styles.textButtonSendCode}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export { ForgotPassword }