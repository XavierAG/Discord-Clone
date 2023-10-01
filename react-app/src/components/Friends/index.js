import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './index.css';

const Friends = () => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log('SESSION USER:', sessionUser);

  const [friends, setFriends] = useState([]);
  console.log('FRIENDS:', friends);

  useEffect(() => {
    // Fetch user's friends when the component mounts
    const user_id = sessionUser.id
    fetch(`/api/users/${user_id}/friends`)
      .then((response) => response.json())
      .then((data) => {
        if (data.friends) {
          console.log("FRIENDS RES", data.friends);
          setFriends(data.friends);
        }
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      <img alt="test" src={sessionUser.img_url} />
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <img
              alt="friend"
              className="friend-pic"
              src={friend.img_url}
            />
            <p>{friend.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
