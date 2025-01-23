import React, { useState } from "react";
import { motion } from "framer-motion";

const NoteBox = () => {
  const [showNote, setShowNote] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.div
        style={{
          width: "200px",
          height: "150px",
          backgroundColor: "#f5f5f5",
          border: "2px solid #ccc",
          borderRadius: "10px",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => setShowNote(!showNote)}
      >
        {showNote && (
          <motion.div
            style={{
              width: "120px",
              height: "80px",
              backgroundColor: "#ffeb3b",
              borderRadius: "5px",
              position: "absolute",
              top: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            פתק
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NoteBox;
