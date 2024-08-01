import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContextManager'; // Import the AuthContext
import Swal from 'sweetalert2';

const ProductContainer = styled(Box)({
  padding: '40px',
  backgroundColor: '#f5f7fa',
  minHeight: '100vh',
  marginTop: '80px', // Added margin top to bring the page down
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(AuthContext); // Use the AuthContext to get the authenticated user

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    if (!authUser) {
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'You need to log in to add products to your cart.',
      });
      return;
    }

    try {
      const db = getFirestore();
      const cartRef = doc(db, 'cart', authUser.uid);
      const itemRef = doc(collection(cartRef, 'items'), product.id);

      const itemDoc = await getDoc(itemRef);

      if (itemDoc.exists()) {
        // Update the existing product's quantity
        const newQuantity = itemDoc.data().quantity + 1;
        await setDoc(itemRef, { ...itemDoc.data(), quantity: newQuantity });
      } else {
        // Add the new product to the cart
        await setDoc(itemRef, { ...product, quantity: 1 });
      }

      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the product to your cart.',
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

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
                  LKR {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  style={{ marginTop: '10px' }}
                  onClick={() => addToCart(product)}
                >
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
