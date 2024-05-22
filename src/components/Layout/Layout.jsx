import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectLoading, selectError } from "../../redux/contacts/selectors.js";
import AppBar from "../AppBar/AppBar";
import Loader from "../Loader/Loader.jsx";
import Error from "../Error/Error.jsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  return (
    <div className={css.layoutContainer}>
      <AppBar />
      {isLoading && <Loader />}
      {isError && <Error />}
      {children}
      <Toaster position="top-right" />
    </div>
  );
}
