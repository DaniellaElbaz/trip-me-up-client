import React, { useState } from "react";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

export default function StatefulSaveButton( {onSave, buttonState} ) {

  const doNothing = () => {}

  return (
    <>
      {buttonState === "saved" && (
        <Button
          size="small"
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={doNothing}
          sx={{
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          Saved
        </Button>
      )}
      {buttonState === "unsaved" && (
        <Button
          size="small"
          color="secondary"
          onClick={onSave}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{
            "&:hover": {
              color: "black",
            },
          }}
        >
          Save
        </Button>
      )}
      {buttonState === "saving" && (
        <Button
          size="small"
          loading
          loadingPosition="end"
          variant="outlined"
          disabled
        >
          Saving...
        </Button>
      )}
    </>
  );
}