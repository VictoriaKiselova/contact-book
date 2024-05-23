import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.message}>Page not found. Return to home page </p>
      <NavLink className={css.linkHome} to="/">
        Home Page
      </NavLink>
    </div>
  );
}
