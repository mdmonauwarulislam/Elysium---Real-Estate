//it will use in auth.controller
//I need this custom error function to handle
//situation like putting less characters for password
//its not an error but need to handle
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.messgae = message;

  return error;
};