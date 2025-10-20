import React, { createContext, useContext, useState } from 'react';

import { ClosetClothingType } from '@/types/ClosetClothingType';
import { SocialProfileType } from '@/types/SocialProfileType';

export type ISelectUserOrStore = SocialProfileType & {
  type: 'common' | 'store' | 'professional';
  pos: { x: number; y: number };
};

export type ISelectClothing = ClosetClothingType & {
  pos: { x: number; y: number };
};

type NewPostContextType = {
  selectedPeople: ISelectUserOrStore[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<ISelectUserOrStore[]>>;
  selectedClothes: ISelectClothing[];
  setSelectedClothes: React.Dispatch<React.SetStateAction<ISelectClothing[]>>;
  clearMarks: () => void;
};

const NewPostContext = createContext<NewPostContextType>({} as NewPostContextType);

type NewPostProviderProps = {
  children: React.ReactNode;
};

export const NewPostProvider = ({ children }: NewPostProviderProps) => {
  const [selectedPeople, setSelectedPeople] = useState<ISelectUserOrStore[]>([]);
  const [selectedClothes, setSelectedClothes] = useState<ISelectClothing[]>([]);

  function clearMarks() {
    setSelectedPeople([]);
    setSelectedClothes([]);
  }

  return (
    <NewPostContext.Provider
      value={{ selectedPeople, setSelectedPeople, selectedClothes, setSelectedClothes, clearMarks }}
    >
      {children}
    </NewPostContext.Provider>
  );
};

export const useNewPost = () => {
  const context = useContext(NewPostContext);

  if (!context) {
    throw new Error('useNewPost must be used within an NewPostProvider');
  }

  return context;
};
