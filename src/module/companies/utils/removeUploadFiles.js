export const handleFileRemove = (type , setLocalData) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  
  };






