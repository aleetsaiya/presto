export type UploadImageType = 'base64' | 'url';

export type SlideElementBase = {
  id: string;
  x: number;
  y: number;
};

export type TextSlideElement = {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  color: string;
  elementType: 'text';
};

export type ImageSlideElement = {
  width: number;
  height: number;
  img: string;
  imgType: UploadImageType;
  alt: string;
  elementType: 'image';
};

export type VideoSlideElement = {
  width: number;
  height: number;
  embdedUrl: string;
  watchUrl: string;
  autoplay: boolean;
  elementType: 'video';
};

export type CodeSlideElement = {
  width: number;
  height: number;
  code: string;
  fontSize: number;
  elementType: 'code';
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
    slideId: string,
    elementId: string,
  ) => Promise<void>;
  updateSlideElement: <T extends SlideElements>(
    presentationId: string,
    slideId: string,
    elementId: string,
    element: T
  ) => Promise<void>;
  clearLocalStore: () => void;
};
