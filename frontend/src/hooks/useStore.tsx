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
  Slide,
  Background,
} from './useStore.types';

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

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
          'type': 'default',
        }
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
        }
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

  const deleteSlide = useCallback(
    async (presentationId: string, slideIndex: number) => {
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    },
    [store]
  );

  const updateSlide: StoreContextType['updateSlide'] = useCallback(
    async (presentationId, slideIndex, slide) => {
      setIsLoading(true);
      const newSlides = [...store[presentationId].slides];
      newSlides[slideIndex] = slide;
      const newStore = {
        ...store,
        [presentationId]: {
          ...store[presentationId],
          slides: newSlides,
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

  const createSlideElement: StoreContextType['createSlideElement'] =
    useCallback(
      async (presentationId, slideId, element) => {
        setIsLoading(true);
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          setIsLoading(false);
          return Promise.reject();
        }
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
          })
          .finally(() => setIsLoading(false));
      },
      [store]
    );

  const deleteSlideElement: StoreContextType['deleteSlideElement'] =
    useCallback(
      async (presentationId: string, slideId: string, elementId: string) => {
        setIsLoading(true);
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          setIsLoading(false);
          return Promise.reject();
        }

        const elementIndex = store[presentationId].slides[
          slideIndex
        ].elements.findIndex((ele) => ele.id === elementId);
        if (elementIndex === -1) {
          setIsLoading(false);
          return Promise.reject();
        }

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
          })
          .finally(() => setIsLoading(false));
      },
      [store]
    );

  const updateSlideElement: StoreContextType['updateSlideElement'] =
    useCallback(
      async (presentationId, slideId, elementId, element) => {
        setIsLoading(true);
        const slideIndex = store[presentationId].slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          setIsLoading(false);
          return Promise.reject();
        }

        const elementIndex = store[presentationId].slides[
          slideIndex
        ].elements.findIndex((ele) => ele.id === elementId);
        if (elementIndex === -1) {
          setIsLoading(false);
          return Promise.reject();
        }

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
          })
          .finally(() => setIsLoading(false));
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

export const useStore = () => useContext(StoreContext);
