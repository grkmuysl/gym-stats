import { StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProfileInfo = {
  name: string;
  surname: string;
  age: string;
  weight: string;
  height: string;
};

type ProfileContextType = {
  profileInformation: ProfileInfo;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setAge: (age: string) => void;
  setWeight: (weight: string) => void;
  setHeight: (height: string) => void;
  saveProfileInformation: () => Promise<void>;
  loadProfileInformation: () => Promise<void>;
  clearProfileInformation: () => Promise<void>;
  isLoading: boolean;
};

const STORAGE_KEY = "ProfileInformation";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadProfileInformation = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedProfile = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProfile) {
        const parsedProfile: ProfileInfo = JSON.parse(storedProfile);
        setName(parsedProfile.name || "");
        setSurname(parsedProfile.surname || "");
        setAge(parsedProfile.age || "");
        setWeight(parsedProfile.weight || "");
        setHeight(parsedProfile.height || "");
      }
    } catch (error) {
      console.error("Profile loading error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProfileInformation = useCallback(async () => {
    try {
      const profileData: ProfileInfo = {
        name,
        surname,
        age,
        weight,
        height,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
    } catch (error) {
      console.error("Profile saving error:", error);
      throw error;
    }
  }, [name, surname, age, weight, height]);

  const clearProfileInformation = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setName("");
      setSurname("");
      setAge("");
      setWeight("");
      setHeight("");
    } catch (error) {
      console.error("Profile clearing error:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    loadProfileInformation();
  }, [loadProfileInformation]);

  const profileInformation: ProfileInfo = {
    name,
    surname,
    age,
    weight,
    height,
  };

  const contextValue: ProfileContextType = {
    profileInformation,
    setName,
    setSurname,
    setAge,
    setWeight,
    setHeight,
    saveProfileInformation,
    loadProfileInformation,
    clearProfileInformation,
    isLoading,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileContextProvider");
  }
  return context;
};

export default ProfileContext;
