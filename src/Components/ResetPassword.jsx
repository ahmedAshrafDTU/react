import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ResetPassword() {
  // Define the base URL for the API
  let BaseUrl = "https://ecommerce.routemisr.com";

  // Function to handle form submission
  async function submitLogin(values) {
    try {
      // Send a PUT request to reset the password using email and new password
      const res = await axios.put(`${BaseUrl}/api/v1/auth/resetPassword`, {
        email: values.email,
        newPassword: values.newPassword,
      });

      // Log the response to the console
      console.log(res);

      // Handle success or display a success message here
    } catch (error) {
      // Handle errors here (e.g., display an error message)
      console.error(error);
    }
  }

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password does not match the pattern")
      .required("Password is required"),
  });

  // Create a useFormik instance to manage the form
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <div className="container">
        <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}

          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            className="form-control mb-3"
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-danger">{formik.errors.newPassword}</div>
          )}

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn form-btn ms-auto d-block"
          >
            reset
          </button>
        </form>
      </div>
    </>
  );
}
