import ContactList from "../ContactList/ContactList.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import ContactForm from "../ContactForm/ContactForm.jsx";
import Loader from "../Loader/Loader.jsx";
import Error from "../Error/Error.jsx";
import css from "./App.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps.js";
import { selectLoading, selectError } from "../../redux/contactsSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1> Phonebook </h1>
      {isLoading && <Loader />}
      {isError && <Error />}
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
