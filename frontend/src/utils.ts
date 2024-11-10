export const fileToBase64 = (file: File): Promise<string> => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validFileTypes.includes(file.type)) {
    return Promise.reject();
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise<string>((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
  });
};
