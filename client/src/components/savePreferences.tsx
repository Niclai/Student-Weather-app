import { UserPreferences } from '../types/userPreferences';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (userPreferences: UserPreferences) => {
    
  const jsonValue = JSON.stringify(userPreferences)
  await AsyncStorage.setItem('@storage_Key', jsonValue)
    
}

const getData = async () => {
    
  const jsonValue = await AsyncStorage.getItem('@storage_Key')
  return jsonValue != null ? JSON.parse(jsonValue) : null;
    
}

interface Props {
  children: ReactNode;
}

const UserPreferencesContext = React.createContext<UserPreferencesContextType | undefined>(undefined); // undefined for now

interface UserPreferencesContextType {
  userPreferences: UserPreferences | undefined;
  updateUserPreferences: (userPreferences: UserPreferences) => void;
}

const UserPreferenceProvider: FC<Props> = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>()

  useEffect(() => {
    getData().then(data =>
      setUserPreferences(data))
  }, [])


const updateUserPreferences = (userPreferences: UserPreferences) => {
  storeData(userPreferences);
  setUserPreferences(userPreferences);
}

const context = {
  userPreferences,
  updateUserPreferences,
};

return (
  <UserPreferencesContext.Provider value={context}>{children}</UserPreferencesContext.Provider>
);

}

export { UserPreferenceProvider, UserPreferencesContext};