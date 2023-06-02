import s from "./Header.module.css";
import { Link, json } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [signedIn, setSignedId] = useState(
    JSON.parse(localStorage.getItem("signedInMYwebsite"))
  );

  useEffect(() => {
    setSignedId(JSON.parse(localStorage.getItem("signedInMYwebsite")));
  }, [localStorage.getItem("signedInMYwebsite") ]);
  return (
    <div className={s.Header}>
      <div className={s.logo}></div>
      <div className={s.links}>
        <Link to="/home" className={s.link}>
          Home
        </Link>

        {!signedIn ? (
          <>
            <Link to="/register" className={s.link}>
              Register
            </Link>
            <Link to="/" className={s.link}>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to={"/profile"} className={s.link}>
              Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default Header;
