import React, { useState } from "react";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUp() {
  const [Messages, setMessages] = useState("");
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    console.log(data);
    try {
      let request = await axios.post(`${url}/signup`, data);
      setActiveResponse(true);
      if (request.data.statusCode === 201) {
        setColor("green");
        setMessages(request.data.message);
        setTimeout(() => {
          window.location.reload();
        }, "3000");
      }
      if (request.data.statusCode === 401) {
        setMessages(request.data.message);
      }
      if (request.data.statusCode === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().min(5, "Enter a valid detail").required("* Required"),
      email: yup.string().required("* Required"),
      username: yup.string().required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <div className="signup-form">
        <div className="sign-container">
          <p style={{ color: "black" }}>
            <strong className="sign-brand-name">Instagram</strong>
          </p>
          <p className="sign-review">
            Sign up to see photos and videos
            <br />
            from your friends.
          </p>
          <br />
          <a className="facebook-login-tag" href="#!">
            <button className="facebook-login-btn">
              <i
                className="fa-brands fa-square-facebook"
                style={{ color: "white" }}
              ></i>
              &nbsp; Log in with Facebook
            </button>
          </a>
          <br />
          <br />
          <input type="text" className="form-optional" disabled />
          <p className="form-or">OR</p>
          <br />

          <form className="form-main" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Mobile Number or Email"
                className="form-controls"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  id="form-actions"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="FullName"
                className="form-controls"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div
                  id="form-actions"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className="form-controls"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div
                  id="form-actions"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="form-controls"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  id="form-actions"
                  className="fa-regular fa-circle-xmark"
                ></div>
              ) : null}
            </div>
            {ActiveResponse ? (
              <div style={{ color: isColor }}>{Messages}</div>
            ) : null}
            <p className="privacy-content">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <a
                href="#!"
                style={{
                  textDecoration: "none",
                  color: "#929292",
                  fontWeight: "500",
                }}
              >
                Learn More
              </a>{" "}
              <br />
              By signing up, you agree to our{" "}
              <a
                href="#!"
                style={{
                  textDecoration: "none",
                  color: "#929292",
                  fontWeight: "500",
                }}
              >
                Terms
              </a>{" "}
              ,{" "}
              <a
                href="#!"
                style={{
                  textDecoration: "none",
                  color: "#929292",
                  fontWeight: "500",
                }}
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="#!"
                style={{
                  textDecoration: "none",
                  color: "#929292",
                  fontWeight: "500",
                }}
              >
                Cookies Policy
              </a>{" "}
              .
            </p>
            <div className="form-group">
              <button type="Submit" className="signup-btn">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;