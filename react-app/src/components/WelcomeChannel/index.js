import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/servers";
import "./WelcomeChannel.css";

export default function WelcomeChannel() {
  return (
    <div className="welcome-bar">
      <h1 className="welcome-channel"> Welcome to Biscord</h1>
    </div>
  );
}
