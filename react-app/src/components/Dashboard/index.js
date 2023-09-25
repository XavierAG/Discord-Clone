import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";


export default function Dashboard() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <h1>Hello from the dashboard</h1>
      <button
        onClick={handleLogout}
        className="login-logout"
      >
        Log Out
      </button>
    </>
  )
};
