import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.container}>
      <Link className={css.authNav} to="/register">
        Register
      </Link>
      <Link className={css.authNav} to="/login">
        Log In
      </Link>
    </div>
  );
}
