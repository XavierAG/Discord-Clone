import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const Friends = () => {
  const { id } = useParams();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch user's friends when the component mounts
    fetch(`/api/users/${id}/friends`)
      .then((response) => response.json())
      .then((data) => {
        if (data.friends) {
          setFriends(data.friends);
        }
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, [id]);

  return (
    <div>
      <h1>Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <h1>{friend.username}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
