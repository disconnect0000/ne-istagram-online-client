import axios from "axios";
import s from "./Home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

function Home() {
  const [posts, setPosts] = React.useState("");

  useEffect(() => {
    return () => {
      getPosts();
    };
  }, [1 === 1]);

  const username = localStorage.getItem("usernameMYwebsite");

  function handleDeletePost(postId) {
    axios
      .post("https://neistagram-disconnect-app.onrender.com/delete", {
        postId: postId,
      })
      .then((res) => {
        getPosts();
      });
  }

  const getPosts = () => {
    axios
      .get("https://neistagram-disconnect-app.onrender.com/upload")
      .then((res) => {
        Promise.all([res.data]).then((res) => {
          console.log(res[0].reverse());
          setPosts(
            res[0].map((post) => (
              <div className={s.post} key={post.id}>
                <h2 className={s.title}>{post.title}</h2>
                <p className={s.description}>{post.description}</p>
                <p className={s.author}>
                  {"Created by "}
                  <Link to={"/user/" + post.username} className={s.link}>
                    {"@" + post.username}
                  </Link>
                </p>
                {username === post.username ? (
                  <>
                    <button
                      className={s.delete}
                      onClick={() => {
                        handleDeletePost(post.id);
                      }}
                    >
                      Delete your post
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={s.wrapper}>
      {!localStorage.getItem("usernameMYwebsite") && (
        <div className={s.warning}>
          <h2>For using Home Page you should log in!</h2>
        </div>
      )}
      <h1>Home Page for everyone!</h1>
      <div className={s.postWrapper}>{posts}</div>
    </div>
  );
}
export default Home;
