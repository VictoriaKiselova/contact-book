import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.containerNav}>
      <NavLink className={css.nav} to="/">
        HomePage
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.nav} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
