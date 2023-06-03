import s from "./Login.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (event) => {
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    Promise.all([Validation(values)]).then((res) => {
      setErrors(res[0]);
      if (res[0].usernameError === "" && res[0].passwordError === "") {
        handleRequest();
      }
    });
  };

  function handleRequest() {
    axios
      .post(
        "https://neistagram-disconnect-app.onrender.com/users/login",
        values
      )
      .then((res) => {
        if (res.data === "Succes") {
          let TimeOut = () => {
            setInterval(() => {
              navigate("/profile");
              window.location.reload();
            }, 1500);
          };
          TimeOut();
          clearTimeout(TimeOut);
          setIsLoggedIn(true);
          localStorage.setItem("usernameMYwebsite", values.username);
          localStorage.setItem("signedInMYwebsite", true);
        } else {
          setErrors((prevState) => {
            return {
              ...prevState,
              passwordError: "Wrong username/password combination!",
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit}>
        <h2>Login Form</h2>
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
            <p htmlFor="password" class={s.text_error}>
              {errors.passwordError}
            </p>
          )}
        </div>
        {isLoggedIn && (
          <p style={{ color: "green", fontSize: 22 }}>
            Successfully logged in!
          </p>
        )}
        <button type="submit" className={s.Submit}>
          <span>Login</span>
        </button>
      </form>
    </div>
  );
}
export default Login;
