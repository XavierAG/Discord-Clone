import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as text from "../../assets/helpers/block-text.js";
import "./LoginForm.css";

function LoginFormPage({ toggleProp }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [toggle, setToggle] = useState(toggleProp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const errSpans = [
    <span className="err-str">EMAIL OR PHONE NUMBER</span>,
    <span className="err-str">PASSWORD</span>,
    <span className="err-sub-str">- Login or password is invalid</span>,
  ];

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data) {
      console.log("DATA:", data);
      setErrors(data);
    } else {
      history.push("/app");
    }
  };

  const demoUser = async () => {
    try {
      const data = await dispatch(
        sessionActions.login({ email: "demo@aa.io", password: "password" })
      );

      console.log("Demo User Data:", data); // Log the data returned from the login action

      if (!data) {
        console.log("Login failed.");
        setErrors(["Login failed."]); // Update errors state if login fails
      } else {
        console.log("Login successful.");
        history.push("/app"); // Redirect to the desired page upon successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors(["An error occurred during login."]); // Handle any login errors
    }
  };

  // const handleDemoLogin = () => {
  //   dispatch(
  //     sessionActions.login({
  //       email: "demo@aa.io",
  //       password: "password",
  //     })
  //   );
  // };

  return (
    <div id="login-background">
      <div className="login-container">
        <h1 className="login-heading">{text.loginHeading}</h1>
        <p className="login-subheading">{text.loginSubheading}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <section className="login-form-section">
            {errors.find(
              (err) => err === "email : Email provided not found."
            ) ? (
              <p className="error-text">
                {errSpans[0]}
                {errSpans[2]}
              </p>
            ) : (
              <p className="login-form-item">
                EMAIL<span className="asterisk">*</span>
              </p>
            )}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </section>
          <section className="login-form-section">
            {errors.length > 1 ||
            errors.find(
              (err) => err === "password : Password was incorrect."
            ) ? (
              <p className="error-text">
                {errSpans[1]}
                {errSpans[2]}
              </p>
            ) : (
              <p className="login-form-item">
                PASSWORD<span className="asterisk">*</span>
              </p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </section>
          <button className="login-submit" type="submit">
            Log In
          </button>
          <button onClick={demoUser}>Demo User</button>
        </form>
        <div className="register-container">
          <label
            htmlFor="register"
            className="login-form-item"
            id="register-label"
          >
            Need an account?
          </label>
          <Link
            name="register"
            className="text-link"
            exact
            to="/register"
            onClick={(e) => setToggle(!toggle)}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
