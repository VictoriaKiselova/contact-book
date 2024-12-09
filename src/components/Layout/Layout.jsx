import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selectors.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import AppBar from "../AppBar/AppBar";
import Loader from "../Loader/Loader.jsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  const isLoading = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  return (
    <div className={css.layoutContainer}>
      <AppBar />
      {isLoading && !isRefreshing && <Loader />}
      {children}
      <Toaster position="top-right" />
    </div>
  );
}
