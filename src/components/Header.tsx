import * as React from 'react';
import axios from '../api/axios';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BallotIcon from '@mui/icons-material/Ballot';
import { MenuList } from '@mui/material';
import { useNavigate } from 'react-router-dom'
const LOGOUT_URL = '/logout';

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({ viewCart, setViewCart }: PropsType) => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { totalItems } = useCart()

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

  const handleLogout = () => {
    const handle = async () => {  
        try {
            const response = await axios.get(LOGOUT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );            
            setAuth({});
            navigate('/', { replace: true });
        } catch (err) {
            console.log(err)
        }
    }
    console.log("------------------LogOut------------------")
    handle();       
  }
	
  const navigate = useNavigate();
  const { auth, setAuth }: any = useAuth();

  const viewButton = viewCart
    ? <MenuItem onClick={() => {
            setViewCart(false)
            navigate('/')}}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <BallotIcon />
        </IconButton>
      </MenuItem> 
    : <MenuItem onClick={() => {
            setViewCart(true)
            navigate('/')}}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </MenuItem> 
  
    let newBtn = null
    let loginoutBtn = null
    if (auth.accessToken) {
        newBtn = (auth?.roles[2])
            ? <MenuItem onClick={() => navigate('/new', {  })}>
                <Typography>New</Typography>
              </MenuItem>
            : null
        loginoutBtn = <MenuItem onClick={() => handleLogout()}>
									      <Typography>Logout</Typography>
								      </MenuItem>
    }  
    if (!auth.accessToken) {
        loginoutBtn = <MenuItem onClick={() => navigate('/login', { replace: true })}>
									      <Typography>Login</Typography>
								      </MenuItem>
    }
  
	  return (
      <AppBar sx={{
        position:"static", bgcolor:"purple"}}>
        <Toolbar disableGutters>
					<Typography
							variant="h5"
							noWrap
              component="a"
              fontWeight="bold"
							href="https://swbae01.github.io/portfolio-client/"
							sx={{
								flexGrow: 1,
                mr: 2,    
                ml: 3,
								display: { xs: 'flex' },
								fontFamily: 'monospace',
								color: 'inherit',
                textDecoration: 'none',                
							}}
						>
							Shopee
          </Typography>
            {viewButton}
          <Box sx={{ flexGrow: 0, display: {xs: 'none', md: 'flex' }}}>
            {newBtn}
            {loginoutBtn}
          </Box>
          <Box sx={{ flexGrow: 0, display: {xs: 'flex', md: 'none' }}}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
						>
              <MenuList>
                {newBtn}  
                {loginoutBtn}
							</MenuList>
            </Menu>
          </Box>
        </Toolbar>
    </AppBar>
  );
}
export default Header