import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Profile.module.css";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.setItem("signedInMYwebsite", false);
    localStorage.removeItem("usernameMYwebsite");
    navigate("/");
    window.location.reload();
  };
  let username = localStorage.getItem("usernameMYwebsite");
  useEffect(() => {
    if (username === "" || !localStorage.getItem("usernameMYwebsite")) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    postName: "",
    postDesc: "",
  });

  function handleChange(event) {
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }
  function handleSubmit(event) {
    let username = localStorage.getItem("usernameMYwebsite");
    event.preventDefault();
    const reqValues = {
      postName: values.postName,
      postDesc: values.postDesc,
      username: username,
    };
    axios
      .post("https://neistagram-disconnect-app.onrender.com/upload", reqValues)
      .then((res) => {});
  }

  return (
    <div className={s.wrapper}>
      <h1>Hello, {username}!</h1>
      <form className={s.createPost} onSubmit={handleSubmit}>
        <h2>Create a post</h2>
        <input
          className={s.postName}
          value={values.postName}
          onChange={handleChange}
          name="postName"
          placeholder="Your title..."
        />
        <textarea
          className={s.postDesc}
          value={values.postDesc}
          onChange={handleChange}
          name="postDesc"
          placeholder="Your description..."
        />
        <button type="submit" className={s.postSend}>
          Post
        </button>
      </form>
      <button onClick={handleLogOut} className={s.Logout}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
