import React from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.containerUserMenu}>
      <p className={css.welcome}>Welcome, {user.displayName}</p>
      <Link className={css.exit} onClick={handleLogout} to="/">
        <IoMdExit /> <span className={css.logOut}>Logout</span>
      </Link>
    </div>
  );
}
