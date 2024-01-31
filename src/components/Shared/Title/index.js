import {
        View,
        Text,
        TouchableOpacity,
        TextInput
} from 'react-native';

import {styles} from './style'

export default function Title(){
  return(
    <View>
      <Text style={styles.title}>Seja Bem-Vindo!</Text>
      <Text style={styles.subTitle}>Entra na sua conta</Text>
    </View>
  )}

export {Title} 