import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'





export default function Register() {


  let navigate = useNavigate()

  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false)

  let BaseUrl = 'https://ecommerce.routemisr.com'

  async function submitRegister(values) {
    setLoading(true)
    let { data } = await axios.post(`${BaseUrl}/api/v1/auth/signup`, values)
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.message)
      })


    if (data.message === 'success') {
      setError('')
      setLoading(false)
      navigate('/login')
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name min length is 3")
      .max(7, "max is 7")
      .required("name is required"),
    email: Yup.string()
      .required("email is required")
      .email("email pattern is inavalid"),
    password: Yup.string()
      .matches(
        /^[A-Za-z][0-9]{6,9}$/,
        `<div>
<p>must be</p>
<p>* Start with a letter (either uppercase or lowercase).</p>
<p>* Be between 6 and 9 characters in total.</p>
<p>* Can only contain letters (A-Z or a-z) and numbers (0-9) </p>   
  </div>`
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "re-Password pattern is inavalid")
      .required("repassworsd is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0-25][0-9]{8}$/, "invalid Phone")
      .required("phone is required"),
  });



  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submitRegister
  })



  return (
    <>
      <div className="container">
        <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <h2>register now</h2>
          {error ? <p className="alert alert-danger my-3">{error}</p> : ""}
          <label htmlFor="name">name:</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>

          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>

          <input
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">rePassword:</label>

          <input
            type="password"
            className="form-control mb-3"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}
          {loading ? (
            <button className="btn form-btn ms-auto d-block">
              <FallingLines
                color="red"
                width="40"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn form-btn ms-auto d-block"
            >
              Register Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
