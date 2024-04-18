import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container  from '@mui/material/Container';
import { CartProvider } from './CartContext';





export default  function SearchResult({searchResult}) {

    

    if (!searchResult) {
        return ;
      }


    return(
        <CartProvider>
        <Container style={{marginTop :40, marginLeft:'-39px'}}>
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          
                <Card  sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image=" "
                        title="Drug Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {searchResult.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {searchResult.description}
                        </Typography>
                        <div style={{marginTop : '10px'}}> 
                            <Typography variant="h8" color="text.primary" style={{fontWeight:'bold'}}>
                                Price: Rs.{searchResult.price}
                            </Typography>
                        </div>
                    </CardContent>
                  
                    <CardActions>
                        <Button 
                        size="small"  
                        variant='contained' 
                        style={{backgroundColor :'#002244'}}
                       
                        >Add To Cart</Button>
                    </CardActions>
    
                </Card>
       
      </div>
     </Container>
     </CartProvider>
    );

    
}
