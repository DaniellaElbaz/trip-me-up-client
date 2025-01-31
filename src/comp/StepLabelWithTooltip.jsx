import React from "react";
import { StepLabel, Tooltip } from "@mui/material";
import StepIcon from "./StepIcon";

export default function StepLabelWithTooltip({ stop, index, isSelected, isPlus }) {
  const maxNameLength = 15;

  const getShortName = (name) =>
    name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;

  return (
    <StepLabel
      StepIconComponent={() => (
        <StepIcon isSelected={isSelected} index={index} isPlus={isPlus} />
      )}
    >
      {!isPlus && (
        <Tooltip title={stop} arrow>
          <span
            style={{
              fontWeight: isSelected ? "bold" : "normal",
              fontSize: isSelected ? "16px" : "14px",
              color: isSelected ? "#3f51b5" : "inherit",
            }}
          >
            {getShortName(stop)}
          </span>
        </Tooltip>
      )}
    </StepLabel>
  );
}

