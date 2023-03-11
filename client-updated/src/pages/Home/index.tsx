import Box from "@mui/material/Box";
import { mobileVersionWidth } from "../../utils";
import { useContext } from "react";
import { WindowContext } from "../../context/WindowContextProvider";
import { DesktopLayout } from "./DesktopLayout";

export const Home = () => {
  const { clientWidth } = useContext(WindowContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <DesktopLayout />
    </Box>
  );
};
