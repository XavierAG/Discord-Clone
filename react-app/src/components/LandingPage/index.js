import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";
import Navigation from "../Navigation";
import { landingIntro } from "../../assets/helpers/block-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./index.css";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) history.push("/app");

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="landing-wrapper">
        <div id="landing-body-container">
          <Navigation isLoaded={isLoaded} />
          <h1 id="landing-heading">IMAGINE A PLACE...</h1>
          <p id="landing-intro">{landingIntro}</p>
          {!sessionUser && (
            <Link
              exact
              to="/register"
              className="login-logout"
              id="signup-link"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <div className="landing-footer">
        <h2 className="dev-text">Developers</h2>
        <div className="socials">
          <div>
            <h3 className="social-names">Jimmy Juarez</h3>
            <div className="landing-icons">
              <a
                href="https://github.com/JimmyJuare"
                target="_blank"
                className="github-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="inner-icon-text">GitHub</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/teodoro-juarez-89bb15221/"
                target="_blank"
                className="linkedin-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <p className="inner-icon-text">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
          <div>
            <h3 className="social-names">Chris Stucke</h3>
            <div className="landing-icons">
              <a
                href="https://github.com/cmstucke"
                target="_blank"
                className="github-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="inner-icon-text">GitHub</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/chris-stucke-1884b515b/"
                target="_blank"
                className="linkedin-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <p className="inner-icon-text">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
          <div>
            <h3 className="social-names">Jashan Singh</h3>
            <div className="landing-icons">
              <a
                href="https://github.com/Jashan2233"
                target="_blank"
                className="github-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="inner-icon-text">GitHub</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/jashan-singh-616856225/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                className="linkedin-icon"
              >
               <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <p className="inner-icon-text">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
          <div>
            <h3 className="social-names">Xavier Guzman</h3>
            <div className="landing-icons">
              <a
                href="https://github.com/XavierAG"
                target="_blank"
                className="github-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="inner-icon-text">GitHub</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/xavier-guzman/"
                target="_blank"
                className="linkedin-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <p className="inner-icon-text">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
