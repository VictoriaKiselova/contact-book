import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
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
import { selectFilteredContacts } from "../../redux/filters/selectors.js";
import { addContact, fetchContacts } from "../../redux/contacts/operations.js";
import { selectFilters } from "../../redux/filters/selectors.js";
import ModalWindow from "../../components/ModalWindow/ModalWindow.jsx";
import UpdateContact from "../../components/UpdateContact/UpdateContact.jsx";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "../ContactsPage/ContactsPage.module.css";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min 3 chars!")
    .max(11, "Max 11 chars!")
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

const formatPhoneNumber = number => {
  const cleaned = ("" + number).replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else {
    return "Incorrect number";
  }
};

export default function ContactsPage() {
  const dispatch = useDispatch();
  const selectNameFilter = useSelector(selectFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [valuesContacts, setValuesContacts] = useState(null);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAdd = ({ name, number }, actions) => {
    const id = nanoid();
    dispatch(addContact({ id, name, number }))
      .unwrap()
      .then(() => {
        dispatch(fetchContacts());
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
          <label htmlFor="nameInput" className={css.label}>
            Name
            <Field name="name" id="nameInput" className={css.input} />
            <ErrorMessage name="name" className={css.error} component="span" />
          </label>
          <label htmlFor="numberInput" className={css.label}>
            Number
            <Field
              type="tel"
              name="number"
              id="numberInput"
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
        Find a contact by name or number
        <input
          className={css.inputSearch}
          type="text"
          name="valueContact"
          value={selectNameFilter}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>

      <div className={css.contactListWrapper}>
        {contacts.map(elem =>
          elem ? (
            <ul key={elem.id} className={css.container}>
              <li className={css.contactItem}>
                <div className={css.contactDate}>
                  <p className={css.elements}>
                    <ImUser className={css.iconsUser} />
                    {elem.name}
                  </p>
                  <p className={css.elements}>
                    <ImPhone className={css.iconsTel} />
                    {formatPhoneNumber(elem.number)}
                  </p>
                </div>

                <div className={css.buttonBox}>
                  <button
                    className={css.changeButton}
                    type="submit"
                    onClick={() => updateModal(elem)}>
                    <ImPencil className={css.iconChange} />
                  </button>

                  <button
                    id="deleteContact"
                    className={css.button}
                    type="submit"
                    onClick={() => openModal(elem.id)}>
                    <ImUserMinus className={css.iconsUser} /> Delete
                  </button>
                </div>
              </li>
            </ul>
          ) : null
        )}
      </div>
    </div>
  );
}
