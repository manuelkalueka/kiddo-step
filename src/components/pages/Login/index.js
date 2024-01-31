import {
      View,
      Text,
      TextInput,
      TouchableOpacity
} from 'react-native';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {AntDesign} from '@expo/vector-icons';
import {styles} from './style'

  const Schema = yup.object({
    email:yup.string().email('Email inválido!').required('Informe o seu email por favor'),
    password:yup.string().min(6,'Senha inválida!').required('Informe a sua senha por favor')
  })

export default function Login(){
  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(Schema)
  })

  const sendForm = (data)=>{
    console.log(data)
  }
  return(
    <View style={styles.containerLogin}>

      <View style={styles.containerTxtEmail}>
      <AntDesign
          size={18.5}
          name='mail'
          color={'#a2c4e0'}
        />
        <Controller
          name='email'
          control={control}
          render={({field:{onChange,onBlur, value}})=>(
            <TextInput style={styles.txtEmail}
            placeholder='Email'
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            />)}/>
      </View>
      {errors.email && <Text style={styles.msgAlerta}>{errors.email?.message}</Text>}

     <View style={styles.containerTxtPassword}>
          <AntDesign
            size={18.5}
            name='lock'
            color={'#a2c4e0'}
          />
            <Controller
              name='password'
              control={control}
              render={({field:{onChange, onBlur, value}})=>(
                <TextInput style={styles.txtPassword}
              placeholder='Senha'
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              />)}/>
     </View>
     {errors.password && <Text style={styles.msgAlerta}>{errors.password?.message}</Text>}

      <TouchableOpacity style={styles.buttonSigIn} onPress={handleSubmit(sendForm)}>
        <Text style={styles.TextSigIn}>Entrar</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.containerForgotPassword}>
            <Text style={styles.textForgotPassword}>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <View style={styles.containerNewAccount}>
          <Text style={styles.textDoYouNeed}>Deseja criar uma conta?</Text>
          <TouchableOpacity>
            <Text style={styles.textCreateAccount}>Criar</Text>
          </TouchableOpacity>
        </View>

    </View>
  )}

  export {Login}