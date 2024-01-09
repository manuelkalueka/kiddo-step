import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Login} from './src/components/pages/Login';

import {Title} from './src/components/Shared/Title'

export default function App() {
  return (
    <View style={styles.container}>
      <Title/>
      <Login/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:60,
    backgroundColor:'#2196f3'
    //justifyContent: 'center',
  },
});
