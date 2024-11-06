import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getStore as getStoreApi, setStore as setStoreApi } from '../api';
import { toast } from 'react-toastify';

export type Slide = any;

// TODO: Presentation have description?
export type Presentation = {
  id: string;
  name: string;
  slides: Array<Slide>;
  createAt: number;
  thumbnail?: string; // TODO: find a default thumbnail and make it non-optional
  thumbnailType?: 'url' | 'base64';
};

export type Store = {
  [uid: string]: Presentation;
};

type StoreContextType = {
  store: Store;
  createPresentation: (id: string, name: string) => Promise<void>;
  deletePresentation: (id: string) => Promise<void>;
  updatePresentation: (id: string, presentation: Presentation) => Promise<void>;
  clearLocalStore: () => void;
};

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<Store>({});

  // Initialize store
  useEffect(() => {
    getStoreApi()
      .then((res) => {
        setStore(res.data.store);
      })
      .catch(() => {
        toast.error('Fail to get data');
      });
  }, []);

  const createPresentation = useCallback(
    async (id: string, name: string) => {
      const newStore = {
        ...store,
        [id]: {
          id,
          name,
          createAt: Date.now(),
          slides: [],
        },
      };
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    [store]
  );

  const deletePresentation = useCallback(
    async (id: string) => {
      // extract without target id
      const { [id]: _, ...newStore } = store;
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    [store]
  );

  const updatePresentation = useCallback(
    async (id: string, presentation: Presentation) => {
      const newStore = {
        ...store,
        [id]: presentation,
      };
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        });
    },
    [store]
  );

  const clearLocalStore = useCallback(async () => {
    setStore({});
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        createPresentation,
        deletePresentation,
        updatePresentation,
        clearLocalStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
