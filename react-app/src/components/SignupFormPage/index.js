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
  const [imageInput, setImageInput] = useState('');
  // const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const loginStyle =
    !email ||
      !username ||
      !password ||
      !confirmPassword ||
      username.length < 4 ||
      password.length < 8 ||
      confirmPassword.length < 8
      ? { background: "#444B95", color: "#98999A" }
      : { background: "#4752C4", color: "white" };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsObj = {};
    if (!email) errorsObj.email = 'A valid email is required';
    if (!username || username.length < 4) errorsObj.username = 'Username must be at least four characters';
    if (!password || password.length < 8) errorsObj.password = 'Password must be at least eight characters';
    if (!confirmPassword || confirmPassword.length < 8) errorsObj.confirmPassword = 'Confirm password must match password';
    const errorsArr = Object.values(errorsObj);
    if (errorsArr.length) {
      setErrors({ ...errorsObj });
      return;
    };

    let data;
    let newImage;
    if (imageInput) {
      data = new FormData();
      data.append("image_url", imageInput);
      data.append("email", email);
      data.append("username", username);
      data.append("password", password);
      newImage = true;
    } else {
      data = {
        email,
        username,
        password
      };
      newImage = false;
    };

    if (password === confirmPassword) {
      const res = await dispatch(signUp(data, newImage));
      if (res) {
        res.forEach((err) => {
          const [key, val] = err.split(" : ");
          errorsObj[key] = val;
        });
        setErrors(errorsObj);
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

          <section id="signup-img-section">
            <div id="sign-img-container">
              <input
                type="file"
                accept="image/*"
                className="signup-input"
                id="signup-img"
                name="image_url"
                onChange={(e) => setImageInput(e.target.files[0])}
              />
              {/* {imageLoading &&
                <p
                  className="create-server-item"
                >LOADING...</p>} */}
              {errors.image
                ?
                <label
                  className="error-text"
                  htmlFor="name"
                >{errors.image}</label>
                :
                <label
                  className="login-form-item"
                  htmlFor="name">PROFILE PICTURE</label>}
            </div>
          </section>

          <section className="login-form-section">
            {errors.email ? (
              <p className="error-text">EMAIL - {errors.email}</p>
            ) : (
              <p className="login-form-item">
                EMAIL<span className="asterisk">*</span>
              </p>
            )}
            <input
              className="signup-input"
              type="email"
              value={email}
              placeholder="A valid email is required"
              onChange={(e) => setEmail(e.target.value)}
            // required
            />
          </section>
          <section className="login-form-section">
            {errors.username ? (
              <p className="error-text">USERNAME - {errors.username}</p>
            ) : (
              <p className="login-form-item">
                USERNAME<span className="asterisk">*</span>
              </p>
            )}
            <input
              id="username-input"
              type="text"
              value={username}
              placeholder="Username must be at least four characters"
              onChange={(e) => setUsername(e.target.value)}
            // required
            />
          </section>
          <section className="login-form-section">
            {errors.password ? (
              <p className="error-text">
                PASSWORD -{" "}
                <span className="err-sub-str">{errors.password}</span>
              </p>
            ) :
              <p className="login-form-item">
                PASSWORD<span className="asterisk">*</span>
              </p>}
            <input
              className="signup-input"
              type="password"
              value={password}
              placeholder="Password must be at least eight characters"
              onChange={(e) => setPassword(e.target.value)}
            // required
            />
          </section>
          <section className="login-form-section">
            {errors.confirmPassword ? (
              <p className="error-text">
                CONFIRM PASSWORD -{" "}
                <span className="err-sub-str">{errors.confirmPassword}</span>
              </p>
            ) : (
              <p className="login-form-item">
                CONFIRM PASSWORD<span className="asterisk">*</span>
              </p>
            )}
            <input
              className="signup-input"
              type="password"
              value={confirmPassword}
              placeholder="Confirm password must match password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            // required
            />
          </section>
          <button
            className="login-submit"
            type="submit"
            style={loginStyle}
          // disabled={
          //   !email ||
          //   !username ||
          //   !password ||
          //   !confirmPassword ||
          //   username.length < 4 ||
          //   password.length < 8 ||
          //   confirmPassword.length < 8
          // }
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
