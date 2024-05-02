import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext({ user: {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUserData() {
      const storedUser = await AsyncStorage.getItem("@KiddoStepAuth");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
