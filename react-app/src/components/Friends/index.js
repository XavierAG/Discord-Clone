import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Friends = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch user's friends when the component mounts
    const user_id = sessionUser.id
    fetch(`/api/users/${user_id}/friends`)
      .then((response) => response.json())
      .then((data) => {
        if (data.friends) {
          console.log("FRIENDS", data.friends);
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
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <p>{friend.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
