import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getStore as getStoreApi, setStore as setStoreApi } from '../api';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import {
  StoreContextType,
  Store,
  Presentation,
  StoreProviderProps,
} from './useStore.types';

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<Store>({});
  /** isLoading will be true when haven't finish fetching data from backend */
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
      const newStore = {
        ...store,
        [id]: {
          id,
          name,
          description,
          createAt: Date.now(),
          slides: [
            {
              id: uuidv4(),
              elements: [],
            },
          ],
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

  const createSlide = useCallback(
    async (presentationId: string) => {
      const newStore = {
        ...store,
        [presentationId]: {
          ...store[presentationId],
          slides: [
            ...store[presentationId].slides,
            { id: uuidv4(), elements: [] },
          ],
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

  const deleteSlide = useCallback(
    async (presentationId: string, slideIndex: number) => {
      const newStore = {
        ...store,
        [presentationId]: {
          ...store[presentationId],
          slides: store[presentationId].slides.filter(
            (_, index) => index != slideIndex
          ),
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

  const createSlideElement: StoreContextType['createSlideElement'] =
    useCallback(
      async (presentationId, slideId, element) => {
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) return Promise.reject();
        const newElement = {
          id: uuidv4(),
          x: 0,
          y: 0,
          ...element,
        };
        const newSlideElements = [
          ...store[presentationId].slides[slideIndex].elements,
          newElement,
        ];
        const newStore = JSON.parse(JSON.stringify(store));
        newStore[presentationId].slides[slideIndex].elements = newSlideElements;

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

  const deleteSlideElement: StoreContextType['deleteSlideElement'] =
    useCallback(
      async (presentationId: string, slideId: string, elementId: string) => {
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) return Promise.reject();

        const elementIndex = store[presentationId].slides[
          slideIndex
        ].elements.findIndex((ele) => ele.id === elementId);
        if (elementIndex === -1) return Promise.reject();

        const newSlideElements = [
          ...store[presentationId].slides[slideIndex].elements,
        ];
        newSlideElements.splice(elementIndex, 1);
        const newStore = JSON.parse(JSON.stringify(store));
        newStore[presentationId].slides[slideIndex].elements = newSlideElements;

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

  const updateSlideElement: StoreContextType['updateSlideElement'] =
    useCallback(
      async (presentationId, slideId, elementId, element) => {
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) return Promise.reject();

        const elementIndex = store[presentationId].slides[
          slideIndex
        ].elements.findIndex((ele) => ele.id === elementId);
        if (elementIndex === -1) return Promise.reject();

        const newSlideElements = [
          ...store[presentationId].slides[slideIndex].elements,
        ];
        newSlideElements[elementIndex] = element;

        const newStore = JSON.parse(JSON.stringify(store));
        newStore[presentationId].slides[slideIndex].elements = newSlideElements;

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
        isLoading,
        createPresentation,
        deletePresentation,
        updatePresentation,
        createSlide,
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

export const useStore = () => useContext(StoreContext);
