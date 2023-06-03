import axios from "axios";
import s from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
function Register() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
    repeatPasswordError: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  const navigate = useNavigate();
  const handleChange = (event) => {
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Promise.all([Validation(values)]).then((res) => {
      setErrors(res[0]);
      if (
        res[0].usernameError === "" &&
        res[0].passwordError === "" &&
        res[0].repeatPasswordError === ""
      ) {
        handleRequest();
      }
    });
  };

  function handleRequest() {
    console.log("sending");
    axios
      .post(
        "https://neistagram-disconnect-app.onrender.com/users/register",
        values
      )
      .then((res) => {
        console.log(res);
        if (res.data === "Taken") {
          setErrors((prevState) => {
            return {
              ...prevState,
              usernameError: "This username is already taken!",
            };
          });
        } else {
          let TimeOut = () => {
            setTimeout(() => {
              navigate("/profile");
              window.location.reload();
            }, 1500);
          };
          TimeOut();
          clearTimeout(TimeOut);
          setIsSignedUp(true);
          localStorage.setItem("usernameMYwebsite", values.username);
          localStorage.setItem("signedInMYwebsite", true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="App">
      <div className={s.wrapper}>
        <form className={s.form} onSubmit={handleSubmit}>
          <h2>Register Form</h2>
          <div className={s.form_group}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.usernameError && (
              <label htmlFor="username" style={{ color: "red", fontSize: 22 }}>
                {errors.usernameError}
              </label>
            )}
          </div>
          <div className={s.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.passwordError && (
              <label htmlFor="username" style={{ color: "red", fontSize: 22 }}>
                {errors.passwordError}
              </label>
            )}
          </div>
          <div className={s.form_group}>
            <label htmlFor="password">Password Again</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat your password"
              value={values.repeatPassword}
              onChange={handleChange}
            />
            {errors.repeatPasswordError && (
              <label htmlFor="username" style={{ color: "red", fontSize: 22 }}>
                {errors.repeatPasswordError}
              </label>
            )}
          </div>

          {isSignedUp && (
            <label style={{ color: "green", fontSize: 25 }}>
              Successfully signed up!
            </label>
          )}
          <button type="submit" className={s.Submit}>
            <span>Register</span>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
