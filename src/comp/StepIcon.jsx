import React from "react";
import { Box } from "@mui/material";

export default function StepIcon({ isSelected, index, isPlus }) {
  return (
    <Box
      sx={{
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: isPlus
          ? "grey.400"
          : isSelected
          ? "primary.main"
          : "grey.500",
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        "&:hover": isPlus && { backgroundColor: "primary.main" },
        cursor: isPlus ? "pointer" : "default",
      }}
    >
      {isPlus ? "+" : index + 1}
    </Box>
  );
}
