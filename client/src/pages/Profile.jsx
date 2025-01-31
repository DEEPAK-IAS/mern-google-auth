import { motion } from "framer-motion";
import "../styles/Profile.css"; // Import custom CSS
import { getState, removeState } from "../utils/state";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const user = JSON.parse(getState("user_info"));
  const navigate = useNavigate();
  
  const handleSignOut = async (e) => {
     e.preventDefault();
     const res = await fetch("/api/v1/auth/signout", {
      method: "GET"
     });
     const data = await res.json();
     if(data.success === true) {
      removeState("user_info");
      navigate("/");
      window.location.reload();
     }
  };
  

  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="profile-card"
      >
        <motion.img
          src={user.avatar}
          alt="User Profile"
          className="profile-image"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.h2
          className="profile-name"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {user.username}
        </motion.h2>
        <motion.p
          className="profile-email"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {user.email}
        </motion.p>

        <motion.button
          onClick={handleSignOut}
          className="signout-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
