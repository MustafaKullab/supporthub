//Function to handle with errors comes from db
const handleErrors = (err) => {
  const errors = {};

  // ** Sign up errors **
  if (err.name == "ValidationError") {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = error.message;
    });
  }

  if (err.code === 11000) {
    errors["email"] = "Email already registered";
  }


  // ** login messages
  if (err.message.includes("Employee is not found, please signup!")) {
    errors["email"] = "Employee is not found, please signup!";
  }

  if (err.message.includes("Incorrect Password.")) {
    errors["password"] = "Password is not correct";
  }

  return errors;
};

module.exports = handleErrors;