import React from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { updateOpen } from './action';
import { Link, useNavigate } from 'react-router-dom';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#3f51b5',
  borderBottom: '2px solid #ffffff',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontFamily: 'Arial',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  color: '#ffffff',
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
}));

const NavBar = ({ dopen, isAuthenticated, updateOpen, logout }) => {
  const handleToggleDrawer = () => {
    updateOpen(!dopen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ padding: '0 16px' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <LogoText noWrap component="div">
            Finance DashBoard
          </LogoText>
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="contained" color="secondary">Login</Button>
          ) : (
            <Button component={Link} to="/" variant="contained" color="secondary">Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  dopen: state.dopen,
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = {
  updateOpen,
  logout: () => ({ type: 'LOGOUT' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);