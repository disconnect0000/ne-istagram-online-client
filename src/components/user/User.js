import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./User.module.css";
import axios from "axios";

function User() {
  const queryString = window.location.pathname;
  let username = queryString.replace("/user/", "");
  let Username = localStorage.getItem("usernameMYwebsite");
  const [userPosts, setUserPosts] = useState();

  useEffect(
    () => {
      return () => getUserPost();
    },
    [
      // axios
      //   .post("http://https://neistagram-disconnect-app.onrender.com/user", {
      //     username: username,
      //   })
      //   .then((res) => {}),
    ]
  );

  function handleDeletePost(postId) {
    // axios
    //   .post("http://https://neistagram-disconnect-app.onrender.com/delete", {
    //     postId: postId,
    //   })
    //   .then((res) => {
    //     getUserPost();
    //   });
  }

  function getUserPost() {
    // axios
    //   .post("http://https://neistagram-disconnect-app.onrender.com/user", {
    //     username: username,
    //   })
    //   .then((res) => {
    //     setUserPosts(
    //       res.data.reverse().map((post) => (
    //         <div className={s.post} key={post.id}>
    //           <h2 className={s.title}>{post.title}</h2>
    //           <p className={s.description}>{post.description}</p>
    //           <p className={s.author}>{"Created by "}</p>
    //           {Username === post.username ? (
    //             <>
    //               <button
    //                 className={s.delete}
    //                 onClick={() => {
    //                   handleDeletePost(post.id);
    //                 }}
    //               >
    //                 Delete your post
    //               </button>
    //             </>
    //           ) : (
    //             <></>
    //           )}
    //         </div>
    //       ))
    //     );
    //   });
  }
  return (
    <div className="App">
      <div className={s.wrapper}>
        <h1>
          User <strong>{username}</strong> posted:
        </h1>
        <div></div>
      </div>
    </div>
  );
}

export default User;
