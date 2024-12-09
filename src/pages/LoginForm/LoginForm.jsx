import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const contactSchema = Yup.object().shape({
  email: Yup.string().email().required("is required!"),
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
        toast.error(
          "User not found, please check your username and password or register",
          {
            style: {
              marginTop: "85px",
              backgroundColor: "rgb(219, 137, 204)",
              color: "#fff",
              borderRadius: "20px 0",
              border: "1px solid green",
              padding: "10px",
            },
          }
        );
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
            <Field
              type="email"
              name="email"
              id={nanoid()}
              className={css.input}
            />
            <ErrorMessage name="email" className={css.error} component="span" />
          </label>
          <label htmlFor={nanoid()} className={css.label}>
            Password
            <Field
              type="password"
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
          <button type="submit" className={css.buttonLogin}>
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
