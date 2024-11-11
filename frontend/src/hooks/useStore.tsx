import { createContext, useContext } from 'react';
import { StoreContextType } from './useStore.types';

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const useStore = () => useContext(StoreContext);
