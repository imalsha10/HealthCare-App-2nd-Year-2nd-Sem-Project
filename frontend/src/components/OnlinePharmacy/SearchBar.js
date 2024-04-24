import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import  Container  from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link , Outlet} from 'react-router-dom';
import axios from 'axios';
import SearchResult from './SearchResult';
import { CartContext } from './CartContext';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display:'inline-flex',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: '20px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '110ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



export default function SearchBar({drugs}) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(null);
  const [error, setError] =React.useState(null);

  const {cart, addToCart} = React.useContext(CartContext);

  const handleSearch = async () => {
    try {
      const response =   await axios.get(`http://localhost:8070/newdrugs/getone/${searchQuery}`); // Use Axios to make the GET request
      if (response.status === 200) {
        console.log(response.data);
        setSearchResult(response.data);
        setError(null);
      } else {
        setSearchResult(null);
        setError('Drug not found');
      }
    } catch (error) {
      console.error('Error searching:', error);
      setError('Failed to fetch search result');
    }
  };




  return (
    <div>
      <Container style={{marginLeft:'65px', marginRight:'25px', marginTop:'35px', maxWidth:'100%'}}>
         <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search Drug"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
            />
            </Search>
            
            <IconButton aria-label="cart"style={{marginLeft:10}}>
           <Link to="/displayCart" style={{color:'black'}}>
              <StyledBadge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon  fontSize='large'/>
              </StyledBadge>
            </Link>
       </IconButton>
       <Typography variant='h8' color='text.secondary' style={{marginLeft:'385px'}}>
             Your one stop shop for all your Medicinal needs..
       </Typography>
       <Link to="/onlinepharmacyP/displayDrugs">
         <Button variant="text">More</Button>
       </Link> 
       <SearchResult searchResult = {searchResult}/>
  </Container>

  <Outlet/>
  </div> 


  );
}
