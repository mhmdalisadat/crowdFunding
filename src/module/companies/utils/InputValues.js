import { cleanNumber } from '../../../utils/formatNumbers';

export const InputValues = (e, setLocalData, localData) => {
  const { name, value } = e.target;
  const cleanedValue = cleanNumber(value);
  setLocalData({ ...localData, [name]: cleanedValue });
};
