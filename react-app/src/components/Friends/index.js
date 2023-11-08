import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Friends.css";

const Friends = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showFriends, setShowFriends] = useState(true);

  const [friends, setFriends] = useState("");

  const [users, setUsers] = useState("");
  const toggleTab = (showFriendsTab) => {
    setShowFriends(showFriendsTab);
  };

  useEffect(() => {
    // Fetch user's friends when the component mounts
    const user_id = sessionUser?.id;
    fetch(`/api/users/${user_id}/friends`)
      .then((response) => response.json())
      .then((data) => {
        if (data.friends) {
          setFriends(data.friends);
        }
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
    fetch(`/api/users/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [sessionUser?.id]);
  const isFriend = (userId) => {
    return friends.some((friend) => friend.id === userId);
  };
  const addFriend = (user_id) => {
    fetch(`api/users/${user_id}/friends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleRemove = (user_id) => {
    fetch(`api/users/${user_id}/friends`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  if (!sessionUser || !friends || !users.length) return null;

  return (
    <div>
      <div className="friends-buttons">
        <div
          className={`friends-nav ${showFriends ? "active-friend" : ""}`}
          onClick={() => toggleTab(true)}
        >
          Friends
        </div>
        <div
          className={`friends-nav ${!showFriends ? "active-friend" : ""}`}
          onClick={() => toggleTab(false)}
        >
          All Users
        </div>
      </div>
      <div>
        {showFriends ? (
          <p className="list-header">Friends - {friends.length}</p>
        ) : (
          <p className="list-header"> All Users - {users.length - 1}</p>
        )}
      </div>
      <div className="divider"></div>
      {showFriends ? (
        <ul className="listed-names">
          {friends.map((friend) => (
            <li className="li-friends" key={friend.id}>
              <div className="friend-info">
                <img alt={friend.username} className="user-pic" src={friend.image_url} />
                <p className="listed-name">{friend.username}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleRemove(friend.id);
                    window.location.reload();
                  }}
                >
                  remove friend
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="listed-names">
          {users
            .filter((user) => user.id !== sessionUser.id)
            .map((user) => (
              <li className="li-friends" key={user.id}>
                <img alt={user.username} className="user-pic" src={user.image_url} />
                <p className="listed-name">{user.username}</p>
                {isFriend(user.id) ? (
                  <span className="checkmark">Friend ✔</span>
                ) : (
                  <button
                    className="add-friend-b"
                    onClick={() => {
                      addFriend(user.id);
                      window.location.reload();
                    }}
                  >
                    add
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;
