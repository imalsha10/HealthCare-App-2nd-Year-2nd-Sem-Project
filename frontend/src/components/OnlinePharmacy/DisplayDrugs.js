import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Container  from '@mui/material/Container';
import Cart from './Cart';
import { CartContext } from './CartContext';



export default function DisplayDrugs() {

   const [drugs, setDrugs] = React.useState([]);
   const {cart, addToCart} = React.useContext(CartContext);

   React.useEffect(() => {
     function allDrugs() {
        axios.get("http://localhost:8070/newdrugs/get").then((res) =>{
            console.log(res.data);
            setDrugs(res.data);
        }).catch((err) =>{
            alert(err.message);
        })
     } 
     allDrugs()
   },[])

   


  return (
   
  
    <Container style={{marginTop :40, marginLeft:'48px'}}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {drugs.map((drug, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Drug Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {drug.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {drug.description}
                    </Typography>
                    <div style={{marginTop : '10px'}}> 
                        <Typography variant="h8" color="text.primary" style={{fontWeight:'bold'}}>
                            Price: Rs.{drug.price}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button 
                    size="small"  
                    variant='contained' 
                    style={{backgroundColor :'#002244'}}
                    onClick={() => addToCart()}
                    >Add To Cart</Button>
                </CardActions>
            </Card>
           
       ))}
     </div>
        <Cart cart={cart}/>
    </Container>


  );
}
