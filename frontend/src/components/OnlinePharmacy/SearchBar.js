import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Container } from '@mui/material';

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

export default function SearchBar() {
  return (
  <Container style={{marginLeft:'65px', marginRight:'25px', marginTop:'35px', maxWidth:'100%'}}>
    <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search Drug"
            inputProps={{ 'aria-label': 'search' }}
        />
        </Search>
        <AddShoppingCartIcon fontSize='large' style={{marginLeft:20, marginRight:10}}/>
  </Container>
  );
}