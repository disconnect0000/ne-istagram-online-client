export default function Validation(data) {
  let errors = {
    usernameError: "",
    passwordError: "",
    repeatPasswordError: "",
  };
  let regTest = /[a-zA-Z]/g;

  if (data.username === "") {
    errors.usernameError = "Enter your username!";
  } else {
    if (regTest.test(data.username) === false) {
      errors.usernameError = "Username should contain letters!";
    }
    if (data.username.length > 20) {
      errors.usernameError = "Username cannot be more than 20 characters!";
    }
  }

  if (data.password === "") {
    errors.passwordError = "Create your password!";
  } else {
    if (data.password.length < 8) {
      errors.passwordError = "Password cannot be less than 8 characters!";
    } else if (data.password.length > 20) {
      errors.passwordError = "Password cannot be more than 20 characters!";
    }
  }

  if (data.repeatPassword === "") {
    errors.repeatPasswordError = "Enter your password!";
  } else {
    if (data.password !== data.repeatPassword) {
      errors.repeatPasswordError = "Passwords don't match!";
    }
  }

  return errors;
}
