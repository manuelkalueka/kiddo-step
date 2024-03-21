import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Persistencia de Dados no Dispositivo
import { Alert } from "react-native";

export const AuthContext = createContext(null); //Criando contexto de Autenticação PERMITE GUARDAR DADOS DE LOGIN E LOGOUT
import { AuthService } from "../services/auth-services"; //API de Autenticação

export const AuthProvider = () => {
  const [authData, setAuthData] = useState(null); //controla dados do Usuário Autenticado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalAuth(); // carrega as Credenciais de Usuário ao Iniciar o APP
  }, []);

  async function signIn(email, passoword) {
    try {
      const auth = await AuthService.signIn(email, passoword);
      setAuthData(auth);
      await AsyncStorage.setItem("@auth_data", JSON.stringify(auth));
      return auth;
    } catch (error) {
      Alert.alert(error?.message, "Tente Novamente");
    }
  }

  async function loadLocalAuth() {
    try {
      const strAuthData = await AsyncStorage.getItem("@auth_data");
      if (strAuthData) {
        setAuthData(auJSON.parse(strAuthData));
      }
      setLoading(false);
    } catch (error) {
      console.log("ERRO AO RECUPERAR DADOS DE LOCAIS", error);
    }
  }

  async function signOut() {
    setAuthData(null);
    await AsyncStorage.removeItem("@auth_data");
    return;
  }

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut, loading }} />
  );
};

export function useAuth() {
  const contextAuth = useContext(AuthContext);
  return contextAuth;
}
