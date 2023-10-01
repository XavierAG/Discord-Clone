import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let errorsObj = {};
  if (errors.length) {
    errors.forEach((err) => {
      const [key, val] = err.split(" : ");
      errorsObj[key] = val;
    });
  }

  const loginStyle =
    !email || !username || !password || !confirmPassword
      ? { background: "#444B95", color: "#98999A" }
      : { background: "#4752C4", color: "white" };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log("DATA:", data);
        setErrors(data);
      } else {
        history.push("/app");
      };
    } else {
      setErrors([
        "password : Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div id="login-background">
      <div className="login-container">
        <h1 className="login-heading">Create an account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <section className="login-form-section">
            {errorsObj.email ? (
              <p className="error-text">EMAIL - {errorsObj.email}</p>
            ) : (
              <p className="login-form-item">
                EMAIL<span className="asterisk">*</span>
              </p>
            )}
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>
          <section className="login-form-section">
            {errorsObj.username ? (
              <p className="error-text">USERNAME - {errorsObj.username}</p>
            ) : (
              <p className="login-form-item">
                USERNAME<span className="asterisk">*</span>
              </p>
            )}
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </section>
          <section className="login-form-section">
            <p className="login-form-item">
              PASSWORD<span className="asterisk">*</span>
            </p>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>
          <section className="login-form-section">
            {errorsObj.password ? (
              <p className="error-text">
                CONFIRM PASSWORD -{" "}
                <span className="err-sub-str">{errorsObj.password}</span>
              </p>
            ) : (
              <p className="login-form-item">
                CONFIRM PASSWORD<span className="asterisk">*</span>
              </p>
            )}
            <input
              className="login-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </section>
          <button
            className="login-submit"
            type="submit"
            style={loginStyle}
            disabled={!email || !username || !password || !confirmPassword}
          >
            Sign Up
          </button>
        </form>
        <div className="register-container">
          <Link className="text-link" exact to="/login">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
