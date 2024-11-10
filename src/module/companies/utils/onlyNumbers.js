export const handleNumberInput = (e) => {
    if (
      !/^[0-9]*$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault();
    }
  };