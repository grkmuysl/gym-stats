import React, { createContext, useContext, useState } from "react";

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
};

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allRecords, setAllRecords] = useState<ExerciseRecordsItem[]>([]);

  const addRecord = (record: ExerciseRecordsItem) => {
    setAllRecords((prev) => [...prev, record]);
  };

  const removeRecord = (exerciseID: string) => {
    setAllRecords((prev) => prev.filter((item) => item.id !== exerciseID));
  };

  return (
    <RecordsContext.Provider
      value={{
        allRecords,
        addRecord,
        removeRecord,
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
