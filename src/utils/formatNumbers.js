export const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const cleanNumber = (value) => String(value).replace(/,/g, '');
