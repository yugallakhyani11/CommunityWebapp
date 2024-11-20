import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/user-slice";
import { logoutEvent } from "../store/slices/event-slice";
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";



//const settings = ["Profile", "Account", "Dashboard", "Logout"];





export const Header = (props: any) => {
  const { t } = useTranslation('common');
  const [user, setUser] = React.useState(null);
  useEffect(() => {

    // Used local storage to store user details
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }}, []);

  const pages = [
    { name: t('navbar.menu.ngos.label'), path: "/ngo" },
    { name: t('navbar.menu.events.label'), path: "/events" },
    { name: t('navbar.menu.blogs.label'), path: "/blogposts" },
    { name: t('navbar.menu.foodposts.label'), path: "/foodPosts" },
  ];

  const [ln, setLn] = React.useState('en');
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleChange = (event: SelectChangeEvent) => {
    setLn(event.target.value as string);
   console.log(event.target.value as string);
   i18n.changeLanguage(event.target.value as string);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle the "Account" setting
const handleAccountClick = () => {
 
  console.log("Account clicked");
};

// Function to handle the "Dashboard" setting
const handleDashboardClick = () => {
  console.log("Dashboard clicked");
};

// Function to handle the "Logout" setting
const handleLogoutClick = () => {
  // Code to log the user out and perform related actions
  localStorage.removeItem("user");
  dispatch(logoutEvent());
  dispatch(logout());
  navigate("/");
  window.location.reload();
  
  console.log("Logout clicked");

};


const settings = [
  { name:  t('menu.account.label'), handleClick: handleAccountClick },
  { name:  t('menu.dashboard.label'), handleClick: handleDashboardClick },
  { name:  t('menu.logout.label'), handleClick: handleLogoutClick },
];





  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Care2Share
          </Typography>
          { user &&
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={page.path}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Care2Share
          </Typography>
          {!user && <Box sx={{ flexGrow: 4, display: { xs: "none", md: "flex" } }}>
            
          </Box>}

          {user && <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
            
          </Box>}
          <Box sx={{ minWidth: 120 }}>
          <Select
          value={ln}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'select language' }}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'es'}>Español</MenuItem>
        </Select>
    </Box>
    {!user && 
    <Box>
      <Button color="inherit" onClick={() => {
            navigate('/login/')
          }}>Login</Button>
          <Button color="inherit" onClick={() => {
            navigate('/register/')
          }}>Sign Up</Button> 
    </Box>}

          {user && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                // <MenuItem key={setting} onClick={handleCloseUserMenu}>
                //   <Typography textAlign="center">{setting}</Typography>
                // </MenuItem>
                <MenuItem key={setting.name} onClick={()=>setting.handleClick()}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
