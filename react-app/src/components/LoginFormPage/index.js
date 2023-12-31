import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
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
    <span className="err-str">EMAIL</span>,
    <span className="err-str">PASSWORD</span>,
    <span className="err-sub-str">- Login or password is invalid</span>,
  ];

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/app");
    }
  };

  const demoUser1 = async () => {
    const email = "demo1@aa.io";
    const password = "password";
    await dispatch(login(email, password));
  };

  const demoUser2 = async () => {
    const email = "demo2@aa.io";
    const password = "password";
    await dispatch(login(email, password));
  };

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
              type="email"
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
          <section className="login-form-section">
            <button className="login-submit" type="submit">
              Log In
            </button>
            <button className="login-submit" onClick={demoUser1}>
              Demo User 1
            </button>
            <button className="login-submit" onClick={demoUser2}>
              Demo User 2
            </button>
          </section>
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
