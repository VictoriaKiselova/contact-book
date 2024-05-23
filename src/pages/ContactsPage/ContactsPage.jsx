import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import {
  ImUser,
  ImPencil,
  ImPhone,
  ImUserPlus,
  ImUserMinus,
} from "react-icons/im";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice.js";
import { addContact, fetchContacts } from "../../redux/contacts/operations.js";
import {
  selectFilters,
  selectFilteredContacts,
} from "../../redux/filters/selectors.js";
import ModalWindow from "../../components/ModalWindow/ModalWindow.jsx";
import UpdateContact from "../../components/UpdateContact/UpdateContact.jsx";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "../ContactsPage/ContactsPage.module.css";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min 3 chars!")
    .max(50, "Max 50 chars!")
    .required("is required!"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      "The phone number must be in the format XXX-XXX-XXXX"
    )
    .min(10, "Min 9 chars!")
    .max(12, "Max 10 chars!")
    .required("is required!"),
});

export default function ContactsPage() {
  const dispatch = useDispatch();
  const selectNameFilter = useSelector(selectFilters);
  const contacts = useSelector(selectFilteredContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [valuesContacts, setValuesContacts] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAdd = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Сontact added!", {
          style: {
            marginTop: "85px",
            backgroundColor: "rgb(219, 137, 204)",
            color: "#fff",
            borderRadius: "20px 0",
            border: "1px solid green",
            padding: "10px",
          },
        });
      })
      .catch(error => {
        console.log(error);
      });

    actions.resetForm();
  };

  const openModal = id => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  const updateModal = elem => {
    setValuesContacts(elem);
    setIsUpdate(true);
  };

  return (
    <div className={css.wrapperContacts}>
      {isModalOpen && (
        <ModalWindow
          idToDelete={idToDelete}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isUpdate && (
        <UpdateContact
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          valuesContacts={valuesContacts}
        />
      )}
      <h1 className={css.phonebook}> Phonebook </h1>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={contactSchema}
        onSubmit={handleAdd}>
        <Form className={css.formAddContact}>
          <label htmlFor={nanoid()} className={css.label}>
            Name
            <Field name="name" id={nanoid()} className={css.input} />
            <ErrorMessage name="name" className={css.error} component="span" />
          </label>
          <label htmlFor={nanoid()} className={css.label}>
            Number
            <Field
              type="tel"
              name="number"
              id={nanoid()}
              className={css.input}
            />
            <ErrorMessage
              name="number"
              className={css.error}
              component="span"
            />
          </label>
          <button type="submit" className={css.buttonAdd}>
            <ImUserPlus /> Add contact
          </button>
        </Form>
      </Formik>

      <label htmlFor="valueContact" className={css.title}>
        Find contacts by name
        <input
          className={css.inputSearch}
          type="text"
          name="valueContact"
          value={selectNameFilter}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>

      <div className={css.contactListWrapper}>
        {contacts.map(elem => (
          // console.log(elem),
          <ul key={elem.id} className={css.container}>
            <li className={css.contactItem}>
              <p className={css.elements}>
                <ImUser className={css.iconsUser} />
                {elem.name}
              </p>
              <p className={css.elements}>
                <ImPhone className={css.iconsTel} />
                {elem.number}
              </p>
            </li>
            <div className={css.buttonBox}>
              <button
                className={css.changeButton}
                type="submit"
                onClick={() => updateModal(elem)}>
                <ImPencil />
              </button>

              <button
                id="deleteContact"
                className={css.button}
                type="submit"
                onClick={() => openModal(elem.id)}>
                <ImUserMinus /> Delete
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}
