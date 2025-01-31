import React from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <motion.div
        className="full-screen-image"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover Endless Possibilities
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Elevate your experience with stunning visuals.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomePage;
