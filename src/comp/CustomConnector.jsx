import { styled, StepConnector } from "@mui/material";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  line: {
    minHeight: "10px",
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
}));

export default CustomConnector;
