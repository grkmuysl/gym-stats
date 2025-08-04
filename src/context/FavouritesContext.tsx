import React, { createContext, useContext, useState } from "react";

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
  removeFavorite: (exerciseId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ExerciseItem[]>([]);

  const addFavorite = (exercise: ExerciseItem) => {
    setFavorites((prev) => [...prev, exercise]);
  };

  const removeFavorite = (exerciseID: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== exerciseID));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
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
