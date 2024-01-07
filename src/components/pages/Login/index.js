import {
      View,
      Text,
      TextInput,
      TouchableOpacity
} from 'react-native';

import {AntDesign} from '@expo/vector-icons';

import {styles} from './style'

export default function Login(){
  return(
    <View style={styles.containerLogin}>

      <View style={styles.containerTxtEmail}>
            <TextInput
            placeholder='Email'
            />
      </View>

     <View style={styles.containerTxtPassword}>
            <TextInput
              placeholder='Senha'
              secureTextEntry={true}
              />
     </View>

      <TouchableOpacity style={styles.buttonSigIn}>
        <Text style={styles.TextSigIn}>Entrar</Text>
      </TouchableOpacity>

        <TouchableOpacity>
            <Text>Esqueci a minha senha</Text>
        </TouchableOpacity>

        <View style={styles.containerNewAccount}>
          <Text>Deseja criar uma conta?</Text>
          <TouchableOpacity>
            <Text>Criar</Text>
          </TouchableOpacity>
        </View>

    </View>
  )}

  export {Login}