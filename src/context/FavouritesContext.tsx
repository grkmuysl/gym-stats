import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ExerciseItem = {
  name: string;
  subtitle: string;
  type: string;
  id: string;
  difficulty: string;
};

type FavoritesContextType = {
  favorites: ExerciseItem[];
  addFavorite: (exercise: ExerciseItem) => void;
  refreshRecords: () => void;
  removeFavorite: (exerciseId: string) => void;
  isLoading: boolean;
};

const STORAGE_KEY = "favoriteExercises";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ExerciseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error("Favorites loading error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFavorites = useCallback(async (favorites: ExerciseItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Records saving error:", error);
    }
  }, []);

  const refreshRecords = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const addFavorite = useCallback(
    async (exercise: ExerciseItem) => {
      setFavorites((prevFavorites) => {
        const updatedRecords = [...prevFavorites, exercise];
        saveFavorites(updatedRecords);
        return updatedRecords;
      });
    },
    [saveFavorites]
  );

  const removeFavorite = useCallback(
    async (exerciseID: string) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter(
          (item) => item.id !== exerciseID
        );
        saveFavorites(updatedFavorites);
        return updatedFavorites;
      });
    },
    [saveFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        refreshRecords,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
