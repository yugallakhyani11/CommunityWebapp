import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
import React, { useEffect } from "react";

function App() {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <div>
          <Header location={location} />
          <Box mt={2} mb={10} p={10}>
            <Outlet />
          </Box>
          <Footer />
        </div>
      </Container>
    </>
  );
}

export default App;
