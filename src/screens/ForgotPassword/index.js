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

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { styles } from './styles'
import defaultStyle from '../../defaultStyle'
import { handleDisableKeyboard } from "../../../utils/dismiss-keyboard"

const schema1 = yup.object({
  email: yup.string().email('Por favor informe um email válido').required('Campo obrigatório'),
})

const schema2 = yup.object({
  code1: yup.number().required('Campo obrigatório'),
  code2: yup.number().required('Campo obrigatório'),
  code3: yup.number().required('Campo obrigatório'),
  code4: yup.number().required('Campo obrigatório'),
})

export default function ForgotPassword() {

  const [visModal, setVisModal] = useState(false)
  const [active, SetActive] = useState(true)

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema1, schema2)
  })

  const sendData = (data) => {
    setVisModal(true)

  }

  const verifyCode = (data) => {
    console.log(data)
    SetActive(false)
    //Faça o preenchimento automático aqui!a
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

              <TouchableOpacity style={styles.btnClose}>
                <Text style={styles.txtBtnClose}>Fechar</Text>
              </TouchableOpacity>

                <Controller
                  name='code1'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.code}
                      keyboardType='numeric'
                      maxLength={1}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />


                <Controller
                  name='code2'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.code}
                      keyboardType='numeric'
                      maxLength={1}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />

                <Controller
                  name='code3'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.code}
                      keyboardType='numeric'
                      maxLength={1}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />

                <Controller
                  name='code4'
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.code}
                      keyboardType='numeric'
                      maxLength={1}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
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