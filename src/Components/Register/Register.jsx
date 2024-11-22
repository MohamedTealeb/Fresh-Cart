import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  async function registerNewUser(obj) {
    seterrorMsg("");
    setsuccessMsg("");
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", obj)
      .then(({ data }) => {
        console.log(data);
        setsuccessMsg(data.message);
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        seterrorMsg(err.response.data.message);
      });
  }
  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      registerNewUser(values);
    },
    validate: function (values) {
      let error = {};
      if (values.name.length < 3 || values.name.length > 10) {
        error.name = "Name Must be more than 3 characters and less than 10";
      }
      if (
        values.email.includes("@") == false ||
        values.email.includes(".com") == false
      ) {
        error.email = "Email Must be Valid";
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        error.phone = "Phone Must be Egyptian number";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        error.password = "Password Must be From 6 to 12 characters only ";
      }
      if (values.password != values.rePassword) {
        error.rePassword = "Password and RePassword not matched ";
      }
      return error;
    },
  });
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Welcome to freshcart
          </h2>

          {errorMsg && (
            <div className="errMsg  alert alert-danger text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="succMsg  alert alert-success text-center">
              {successMsg}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div  className='w-full flex flex-col gap-4'>
           
              <label className="mt-3" htmlFor="name">
                Name
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                placeholder="name"
                type="text"
                className="form-control "
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger text-center">
                  {" "}
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>
            <label className="mt-3" htmlFor="email">
              Email
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              placeholder="email"
              type="email"
              className="form-control"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger text-center">
                {" "}
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}

            <label className="mt-3" htmlFor="phone">
              Phone
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              id="phone"
              placeholder="phone"
              type="text"
              className="form-control"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger text-center">
                {" "}
                {formik.errors.phone}
              </div>
            ) : (
              ""
            )}

            <label className="mt-3" htmlFor="password">
              Password
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              id="password"
              placeholder="password"
              type="password"
              className="form-control"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger text-center">
                {" "}
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}

            <label className="mt-3" htmlFor="rePassword">
              rePassword
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              id="rePassword"
              placeholder="rePassword"
              type="password"
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger text-center">
                {" "}
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}

            <button className="btn btn-outline-primary mt-3" type="submit">
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Already have an account?
            </span>
            <Link to="/login" className="no-underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
