import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getStore as getStoreApi, setStore as setStoreApi } from '../api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from './useStore';
import {
  StoreContextType,
  Store,
  Presentation,
  StoreProviderProps,
  Slide,
  Background,
} from './useStore.types';

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<Store>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize store
  useEffect(() => {
    getStoreApi()
      .then((res) => {
        setStore(res.data.store);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Fail to get data');
      });
  }, []);

  const createPresentation = useCallback(
    async (id: string, name: string, description: string) => {
      setIsLoading(true);
      const background: Background = {
        type: 'solid-color',
        solidColor: '#ffffff',
      };
      const slide: Slide = {
        id: uuidv4(),
        elements: [],
        fontFamily: 'Roboto',
        background: {
          type: 'default',
        },
      };
      const newStore = {
        ...store,
        [id]: {
          id,
          name,
          description,
          background,
          createAt: Date.now(),
          slides: [slide],
        },
      };
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [store]
  );

  const deletePresentation = useCallback(
    async (id: string) => {
      // extract without target id
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...newStore } = store;
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        })
        .finally(() => setIsLoading(false));
    },
    [store]
  );

  const updatePresentation = useCallback(
    async (id: string, presentation: Presentation) => {
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    },
    [store]
  );

  const createSlide = useCallback(
    async (presentationId: string) => {
      setIsLoading(true);
      const slide: Slide = {
        id: uuidv4(),
        elements: [],
        fontFamily: 'Roboto',
        background: {
          type: 'default',
        },
      };
      const newStore = {
        ...store,
        [presentationId]: {
          ...store[presentationId],
          slides: [...store[presentationId].slides, slide],
        },
      };
      return setStoreApi(newStore)
        .then(() => {
          setStore(newStore);
          return Promise.resolve();
        })
        .catch(() => {
          return Promise.reject();
        })
        .finally(() => setIsLoading(false));
    },
    [store]
  );

  return (
    <StoreContext.Provider
      value={{
        store,
        isLoading,
        createPresentation,
        deletePresentation,
        updatePresentation,
        createSlide,
        updateSlide,
        deleteSlide,
        createSlideElement,
        deleteSlideElement,
        updateSlideElement,
        clearLocalStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
