import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";
import Navigation from "../Navigation";
import { landingIntro } from "../../assets/helpers/block-text";
import img from '../../assets/images/landing-background.jpg'
import './index.css'


const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) history.push('/app');

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

    <div
      id='landing-background'
    >
      <div id="landing-img-container">
        <img
          alt='landing'
          id="landing-img"
          src={img}
        />
      </div>
      <Navigation isLoaded={isLoaded} />
      <div id="landing-body-container">
        <h1 id="landing-heading">IMAGINE A PLACE...</h1>
        <p id="landing-intro">{landingIntro}</p>
        {!sessionUser &&
          <Link
            exact to='/register'
            className="login-logout"
            id='signup-link'
          >
            Sign Up
          </Link>}
      </div>
    </div>
  )
};

export default LandingPage;
