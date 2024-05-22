import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Min 2 chars!")
    .max(50, "Max 50 chars!")
    .required("is required!"),
  email: Yup.string().email().required("is required!"),
  password: Yup.string().min(6, "Min 6 chars!").required("is required!"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("You are successfully registered!", {
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

  return (
    <div>
      <h3 className={css.title}>Register your account</h3>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}>
        <Form className={css.form}>
          <label htmlFor={nanoid()} className={css.label}>
            Username
            <Field name="name" id={nanoid()} className={css.input} />
            <ErrorMessage name="name" className={css.error} component="span" />
          </label>
          <label htmlFor={nanoid()} className={css.label}>
            Email
            <Field name="email" id={nanoid()} className={css.input} />
            <ErrorMessage name="email" className={css.error} component="span" />
          </label>
          <label htmlFor={nanoid()} className={css.label}>
            Password
            <Field
              type="text"
              name="password"
              id={nanoid()}
              className={css.input}
            />
            <ErrorMessage
              name="password"
              className={css.error}
              component="span"
            />
          </label>
          <button type="submit" className={css.buttonAdd}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
