import React, { FC, ReactNode, useEffect, useState } from "react";
import { UserPreferences } from "../types/userPreferences";
import { getData, storeData } from "../api/storage";

const storageKey = "@userPreferences";

interface Props {
  children: ReactNode;
}

/**
 * Context for retrieving and updating the userPreferences from any component
 * that is a descendent of the UserPreferencesProvider.
 */
const UserPreferencesContext = React.createContext<UserPreferencesContextType>({
  userPreferences: undefined,
  updateUserPreferences: () => undefined,
});

interface UserPreferencesContextType {
  /**
   * undefined is used when preferences are still being loaded. null is used
   * when no user preferences have been set
   */
  userPreferences: UserPreferences | null | undefined;
  updateUserPreferences: (userPreferences: UserPreferences) => void;
}

/**
 * Provider managing the state of user preferences. Upon initialisation fetches
 * user preferences persisted in local storage, and upon each update persists
 * back to the device's local storage.
 */
const UserPreferencesProvider: FC<Props> = ({ children }) => {
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>();

  useEffect(() => {
    getData<UserPreferences>(storageKey).then(data => setUserPreferences(data));
  }, []);

  const updateUserPreferences = (userPreferences: UserPreferences) => {
    storeData(storageKey, userPreferences);
    setUserPreferences(userPreferences);
  };

  const context = {
    userPreferences,
    updateUserPreferences,
  };

  return (
    <UserPreferencesContext.Provider value={context}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export { UserPreferencesProvider, UserPreferencesContext };
