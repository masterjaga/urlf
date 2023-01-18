import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  let navigate = useNavigate();

  const [Messages, setMessages] = useState([]);
  const [ActiveResponse, setActiveResponse] = useState(false);
  const [isColor, setColor] = useState("red");

  let handleSubmit = async (data) => {
    try {
      let request = await axios.post(`${url}/login`, data);
      setActiveResponse(true);
      if (request.data.statusCode === 200) {
        window.localStorage.setItem("app-token", request.data.token);
        setColor("green");
        setMessages(request.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, "3000");
      }
      if (request.data.statusCode === 404) {
        setMessages(request.data.message);
      }
      if (request.data.statusCode === 405) {
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
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5, "Enter a valid detail").required("* Required"),
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
      <div className="form-login">
        <div className="sign-container">
          <p style={{ color: "black" }}>
            <strong className="sign-brand-name">Instagram</strong>
          </p>
          <br />
          <form className="form-main" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Phone number, username, or email"
                className="form-controls"
                onClick={() => setActiveResponse(false)}
                onChange={formik.handleChange}
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
                id="password"
                name="password"
                type="Password"
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
            <br />
            <div className="form-group">
              <button type="submit" className="signup-btn">
                Log in
              </button>
            </div>
            <br />
            <a
              href="/password-reset/email/verification"
              className="login-forgot-container"
            >
              {" "}
              Forgot password?
            </a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
