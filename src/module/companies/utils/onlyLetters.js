export const CompanyOnlyLetters = (e) => {
  if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
    e.preventDefault();
  }
};
