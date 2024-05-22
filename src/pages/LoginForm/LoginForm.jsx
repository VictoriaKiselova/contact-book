import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./LoginForm.module.css";
import { logIn } from "../../redux/auth/operations";

const contactSchema = Yup.object().shape({
  email: Yup.string().email().min(5, "Min 5 chars!").required("is required!"),
  password: Yup.string().min(6, "Min 6 chars!").required("is required!"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const handleSubmitLogin = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("You are successfully logged in!", {
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
      <h3 className={css.titleLogin}>Please, log in</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={contactSchema}
        onSubmit={handleSubmitLogin}>
        <Form className={css.form}>
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
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
