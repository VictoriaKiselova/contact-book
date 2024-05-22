import { ImAddressBook } from "react-icons/im";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.containerHomePage}>
      <p className={css.content}>
        <ImAddressBook className={css.icon} />
        <span className={css.title}>Contact Book</span> is an application for
        convenient contact management.
        <br /> It allows users to store information about their contacts,
        including names, phone numbers.
      </p>
      <p className={css.content}>
        Users can view, add, edit, delete contacts, and search their contact
        collection.
      </p>
    </div>
  );
}
