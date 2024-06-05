import { nanoid } from "nanoid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { updateContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import Modal from "react-modal";
import toast from "react-hot-toast";
import css from "./UpdateContact.module.css";

Modal.setAppElement("#root");
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

export default function UpdateContact({
  isUpdate,
  setIsUpdate,
  valuesContacts,
}) {
  const dispatch = useDispatch();
  const customStyles = {
    content: {
      color: "#fff",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "rgb(219, 137, 204)",
      textShadow: "1px 2px 2px #000",
    },
  };

  const handleChange = (values, actions) => {
    dispatch(updateContact(values))
      .unwrap()
      .then(() => {
        toast.success("Сontact changed!", {
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
    setIsUpdate(false);
    actions.resetForm();
  };

  return (
    <div>
      <Modal
        isOpen={isUpdate}
        style={customStyles}
        className={css.containerModal}>
        <button className={css.closeModal} onClick={() => setIsUpdate(false)}>
          <ImCross className={css.closeIcon} />
        </button>
        <h3 className={css.updatetitle}>Enter new data to change contact </h3>
        <Formik
          initialValues={valuesContacts}
          validationSchema={contactSchema}
          onSubmit={handleChange}>
          <Form className={css.formUpdateContact}>
            <label htmlFor={nanoid()} className={css.label}>
              Name
              <Field name="name" id={nanoid()} className={css.input} />
              <ErrorMessage
                name="name"
                className={css.error}
                component="span"
              />
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
            <button type="submit" className={css.buttonUpdate}>
              Update contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
