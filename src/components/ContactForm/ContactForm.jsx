import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

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

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label htmlFor={nanoid()} className={css.label}>
          Name
        </label>
        <Field name="name" id={nanoid()} className={css.input} />
        <ErrorMessage name="name" className={css.error} component="span" />

        <label htmlFor={nanoid()} className={css.label}>
          Number
        </label>
        <Field type="tel" name="number" id={nanoid()} className={css.input} />
        <ErrorMessage name="number" className={css.error} component="span" />

        <button type="submit" className={css.buttonAdd}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
