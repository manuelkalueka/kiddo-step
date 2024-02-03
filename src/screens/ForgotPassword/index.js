import React,{useState} from 'react'
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
import {FontAwesome5, FontAwesome} from '@expo/vector-icons'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { styles } from './styles'
import defaultStyle from '../../defaultStyle'
import {handleDisableKeyboard} from "../../utils/dismiss-keyboard"

const schema = yup.object({
  email: yup.string().email('Por favor informe um email válido').required('Campo obrigatório')
})

export default function ForgotPassword(){

  const [visModal, setVisModal] = useState(false)

  const { control, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  })

  const sendData = (data)=>{
    setVisModal(true)
    
  }

  return(
    <TouchableWithoutFeedback onPress={()=>handleDisableKeyboard(Keyboard)}>
    <View style={styles.container}>

        <Modal
          animationType='none'
          transparent={true}
          visible={visModal}
        >
          <View style={styles.containerModal}>

                <ActivityIndicator 
                size={'none'}
                color={'orange'}
              />
             
            <View style={styles.containerCode}>
              <View style={styles.containerInputsCode}>
                <TextInput
                  style={styles.code}
                />

                <TextInput
                  style={styles.code}
                />

                <TextInput
                  style={styles.code}
                />

                <TextInput
                  style={styles.code}
                />
              </View>
              
              <TouchableOpacity style={styles.buttonConfirmation}>
                <Text style={styles.textButtonConfirmation}>Confirmar</Text>
              </TouchableOpacity>
            </View>

          </View>

        </Modal>

      <Text style={styles.titleForgot}>Insira o teu email</Text>
      <Text style={styles.subtitleForgot}>Ao inserir o teu email enviaremos para você um código de recuperação da sua senha</Text>

     <View style={styles.containerInputs}>
      <FontAwesome
        name='envelope'
        size={25}
        color={defaultStyle.colors.mainColorBlue}
      />

     <Controller
        name='email'
        control={control}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
          style={styles.textInput}
          placeholder='Digite o email da conta'
          autoCapitalize='none'
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          
    />)}/>
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

export {ForgotPassword}