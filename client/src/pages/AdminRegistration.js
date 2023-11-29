import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AdminRegistration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(25).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const history = useHistory();

  const onSubmit = (data, { setSubmitting, setFieldError }) => {
    axios.post("http://localhost:3001/auth/reg-admin", data)
      .then((response) => {
        console.log(response.data);
        // Handle successful registration
        history.push("/login"); // Redirect to the login page
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setFieldError("username", error.response.data.error);
        } else {
          console.error("Error:", error);
          // Handle other registration errors
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AdminRegistration;
