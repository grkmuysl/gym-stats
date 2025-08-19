import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ExerciseRecordsItem = {
  id: string;
  exerciseName: string;
  setsCount: number;
  repsCount: number;
  weight: number;
  date: string;
};

type RecordsContextType = {
  allRecords: ExerciseRecordsItem[];
  addRecord: (record: ExerciseRecordsItem) => void;
  removeRecord: (exerciseID: string) => void;
  refreshRecords: () => void;
  isLoading: boolean;
};

const STORAGE_KEY = "exerciseRecords";

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allRecords, setAllRecords] = useState<ExerciseRecordsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedRecords = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedRecords) {
        const parsedRecords = JSON.parse(storedRecords);
        setAllRecords(parsedRecords);
      }
    } catch (error) {
      console.error("Records loading error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveRecords = useCallback(async (records: ExerciseRecordsItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Records saving error:", error);
    }
  }, []);

  const refreshRecords = useCallback(() => {
    loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    loadRecords();
  }, []);

  const addRecord = useCallback(
    async (record: ExerciseRecordsItem) => {
      setAllRecords((prevRecords) => {
        const updatedRecords = [...prevRecords, record];
        saveRecords(updatedRecords);
        return updatedRecords;
      });
    },
    [saveRecords]
  );

  const removeRecord = useCallback(
    async (exerciseID: string) => {
      setAllRecords((prevRecords) => {
        const updatedRecords = prevRecords.filter(
          (item) => item.id !== exerciseID
        );
        saveRecords(updatedRecords);
        return updatedRecords;
      });
    },
    [saveRecords]
  );

  return (
    <RecordsContext.Provider
      value={{
        allRecords,
        addRecord,
        removeRecord,
        refreshRecords,
        isLoading,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};
