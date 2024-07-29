import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';
import p4 from '../assets/p4.png';
import p5 from '../assets/p5.png';
import p6 from '../assets/p6.png';
import p7 from '../assets/p7.png';
import p8 from '../assets/p8.png';
import p9 from '../assets/p9.png';

const ProductContainer = styled(Box)({
  padding: '40px',
  backgroundColor: '#f5f7fa',
  minHeight: '100vh',
  marginTop: '80px', // Added margin top to bring the page down
});

const products = [
  { id: 1, name: 'Product 1', image: p1, description: 'Description for product 1', price: 'LKR 1999' },
  { id: 2, name: 'Product 2', image: p2, description: 'Description for product 2', price: 'LKR 2999' },
  { id: 3, name: 'Product 3', image: p3, description: 'Description for product 3', price: 'LKR 3999' },
  { id: 4, name: 'Product 4', image: p4, description: 'Description for product 4', price: 'LKR 4999' },
  { id: 5, name: 'Product 5', image: p5, description: 'Description for product 5', price: 'LKR 5999' },
  { id: 6, name: 'Product 6', image: p6, description: 'Description for product 6', price: 'LKR 6999' },
  { id: 7, name: 'Product 7', image: p7, description: 'Description for product 7', price: 'LKR 7999' },
  { id: 8, name: 'Product 8', image: p8, description: 'Description for product 8', price: 'LKR 8999' },
  { id: 9, name: 'Product 9', image: p9, description: 'Description for product 9', price: 'LKR 9999' },
];

const Products = () => {
  return (
    <ProductContainer>
      <Navbar />
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h6" component="div" color="primary" style={{ marginTop: '10px' }}>
                  {product.price}
                </Typography>
                <Button variant="contained" color="primary" startIcon={<ShoppingCartIcon />} style={{ marginTop: '10px' }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ProductContainer>
  );
};

export default Products;
