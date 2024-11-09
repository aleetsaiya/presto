export type UploadImageType = 'base64' | 'url';

export type SlideElementBase = {
  id: string;
  x: number;
  y: number;
};

export type TextSlideElement = {
  size: number;
  text: string;
  fontSize: number;
  color: string;
};

export type ImageSlideElement = {
  size: number;
  img: string;
  imgType: UploadImageType;
  alt: string;
};

export type VideoSlideElement = {
  size: number;
  url: string;
  autoplay: boolean;
};

export type CodeSlideElement = {
  size: number;
  code: string;
  fontSize: number;
};

export type SlideElementsWithoutBase =
  | CodeSlideElement
  | VideoSlideElement
  | ImageSlideElement
  | TextSlideElement;

export type SlideElements = SlideElementBase & SlideElementsWithoutBase;

export type Slide = {
  id: string;
  elements: Array<SlideElements>;
};

export type Presentation = {
  id: string;
  name: string;
  description: string;
  slides: Array<Slide>;
  createAt: number;
  thumbnail?: string;
  thumbnailType?: UploadImageType;
};

export type Store = {
  [uid: string]: Presentation;
};

export type StoreProviderProps = {
  children: React.ReactNode;
};

export type StoreContextType = {
  store: Store;
  isLoading: boolean;
  createPresentation: (
    id: string,
    name: string,
    description: string
  ) => Promise<void>;
  deletePresentation: (id: string) => Promise<void>;
  updatePresentation: (id: string, presentation: Presentation) => Promise<void>;
  createSlide: (presentationId: string) => Promise<void>;
  deleteSlide: (presentationId: string, slideIndex: number) => Promise<void>;
  createSlideElement: <T extends SlideElementsWithoutBase>(
    presentationId: string,
    slideId: string,
    element: T
  ) => Promise<void>;
  deleteSlideElement: (
    presentationId: string,
    slideId: string
  ) => Promise<void>;
  updateSlideElement: <T extends SlideElementsWithoutBase>(
    presentationId: string,
    slideId: string,
    elementId: string,
    element: T
  ) => Promise<void>;
  clearLocalStore: () => void;
};
