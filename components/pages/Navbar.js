import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';      // Achievements Icon
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';      // Leaderboard Icon

import CustomTooltip from '../common/CustomTooltip';

// Alternative approach using require
const MindMatter = require('../../assets/images/MindMatter.png');

const Navbar = (props) => {
    const { toggleSidebar } = props;
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [headRoute, setHeadRoute] = React.useState(null);

    const pathname = useLocation().pathname;
    useEffect(() => {
        let text = '';
        switch(pathname) {
            case "/pages/dashboard":
                text = "Dashboard";
                break;
            case "/pages/eap":
                text = "EAP - Employee Assistance Program";
                break;
            case "/pages/set-reminders":
                text = "Set Reminders";
                break;
            case "/pages/relaxing-activities":
                text = "Relaxing Activities";
                break;
            case "/pages/daily-activities":
                text = "Daily Activities";
                break;
            case "/pages/educational-resources":
                text = "Educational Resources";
                break;
            case "/pages/profile":
                text = "Profile";
                break;
            case "/pages/achievements":
                text = "Achievements";
                break;
            case "/pages/leaderboard":
                text = "Leaderboard";
                break;
            default:
                text = null;
        }
        setHeadRoute(text);
    }, [pathname]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleClose();
        navigate("/pages/profile");
    }

    const handleLogoutClick = () => {
        handleClose();
        localStorage.removeItem("token");
        sessionStorage.removeItem("isMySessionActive");
        navigate("/auth/login");
    }

    const handleMyAchievementsClick = () => {
        navigate("/pages/achievements");
    }

    const handleLeaderboardClick = () => {
        navigate("/pages/leaderboard");
    }

    return (
        <Box sx={{ flexGrow: 1 }} className="navbar">
            <AppBar position="static" sx={{ boxShadow: 3, backgroundColor: 'var(--dark-blue)' }}>
                <Toolbar>
                    <div className="leftContent">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, display: { lg: 'none' }, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
                            onClick={() => toggleSidebar(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <img 
                            src={MindMatter}
                            alt="MindMatter Logo"
                            style={{ 
                                height: '40px',
                                marginRight: '15px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',
                                border: '1px solid red',
                                backgroundColor: 'white',
                            }}
                            onClick={() => navigate('/pages/dashboard')}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onError={(e) => console.log('Image failed to load:', e)}
                        />

                        <HomeIcon className="homeIcon" sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }} />
                        <Typography variant="body" sx={{ flexGrow: 1 }}>
                            {headRoute !== null ? `/ ${headRoute}` : ''}
                        </Typography>
                    </div>
                    
                    <div className="rightContent">
                        <CustomTooltip title="Achievements">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMyAchievementsClick}
                                color="inherit"
                                sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
                            >
                                <LocalPoliceIcon />
                            </IconButton>
                        </CustomTooltip>

                        <CustomTooltip title="Leaderboard">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleLeaderboardClick}
                                color="inherit"
                                sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
                            >
                                <EmojiEventsIcon />
                            </IconButton>
                        </CustomTooltip>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{
                                ".MuiPaper-elevation": {
                                    top: "70px !important",
                                    backgroundColor: "var(--dark-blue)",
                                    color: "#ffffff",
                                    boxShadow: 3,
                                },

                                ".MuiMenuItem-root:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }
                            }}
                        >
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;