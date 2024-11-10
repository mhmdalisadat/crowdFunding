import { fileFields } from './fileFields';

export const getFormData = (data) => {
  const formData = new FormData();

  fileFields.forEach((field) => {
    if (data[field]) {
      formData.append(field, data[field]);
    }
  });
  return formData;
};
