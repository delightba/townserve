export const formatDate = (inputDate) => {
 const options = { day: 'numeric', month: 'long', year: 'numeric' };
 const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

 return formattedDate;
};

export const readFileAsDataURL = (file) => {
 return new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
   resolve(reader.result);
  };

  reader.onerror = (error) => {
   reject(error);
  };

  reader.readAsDataURL(file);
 });
};