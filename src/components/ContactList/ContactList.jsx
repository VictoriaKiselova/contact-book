import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice.js";
import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.contactListWrapper}>
      {contacts.map(elem => (
        <div key={elem.id}>
          <Contact contact={elem} />
        </div>
      ))}
    </div>
  );
}
