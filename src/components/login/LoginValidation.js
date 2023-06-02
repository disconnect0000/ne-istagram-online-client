export default function Validation(data) {
  let errors = {
    usernameError: "",
    passwordError: "",
  };

  if (data.username === "") {
    errors.usernameError = "Enter your username!";
  } else {
    if (data.username.length > 20) {
      errors.usernameError = "Username cannot be more than 20 characters!";
    }
  }

  if (data.password === "") {
    errors.passwordError = "Enter your password!";
  } else {
    if (data.password.length < 8) {
      errors.passwordError = "Password cannot be less than 8 characters!";
    } else if (data.password.length > 20) {
      errors.passwordError = "Password cannot be more than 20 characters!";
    }
  }
  return errors;
}
