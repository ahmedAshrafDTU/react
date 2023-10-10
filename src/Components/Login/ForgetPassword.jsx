import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import * as Yup from "yup";
import VeryFyCode from "../VeryFyCode";
import ResetPassword from "../ResetPassword";

export default function ForgetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BaseUrl = "https://ecommerce.routemisr.com";

  async function submitLEmail(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BaseUrl}/api/v1/auth/forgotPasswords`,
        { email: values.email }
      );
      if (data.message === "success") {
        
        setError("");
        setLoading(false);


      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitLEmail,
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {loading ? (
          <button className="btn form-btn ms-auto d-block" disabled>
            <FallingLines
              color="red"
              width={40}
              visible={true}
              ariaLabel="falling-lines-loading"
            />
            Sending...
          </button>
        ) : (
          <button
            type="submit"
            className="btn form-btn ms-auto d-block"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Verify
          </button>
        )}
      </form>
      {error && <div className="error-message">{error}</div>}


<VeryFyCode></VeryFyCode>
      <ResetPassword></ResetPassword>
    </div>
  );
}
