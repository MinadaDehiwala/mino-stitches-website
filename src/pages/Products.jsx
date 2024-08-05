import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContextManager'; // Import the AuthContext
import Swal from 'sweetalert2';

// Styled components
const BlackBar = styled(Box)({
  backgroundColor: '#000', // Black color
  height: '240px', // 4x the original height
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff', // White text color
  fontSize: '20px', // Adjust text size as needed
  padding: '0 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for a subtle effect
});

const ProductContainer = styled(Box)({
  padding: '40px 20px',
  backgroundColor: '#f9fafb', // Softer background color
  minHeight: '100vh',
  marginTop: '20px', // Adjusted to remove fixed position offset
});

const CategoryButton = styled(Button)({
  margin: '10px',
  backgroundColor: '#FF4081',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '20px',
  fontSize: '14px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#F50057',
  },
});

const ProductCard = styled(Card)({
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
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

  const handleCategoryClick = (category) => {
    if (category === 'Hoop Stitches') {
      // Implement category filtering logic here
      console.log(`Selected Category: ${category}`);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Coming Soon',
        text: `The ${category} category is coming soon!`,
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
    <Box>
      <Navbar />
      <BlackBar>
        <Box mt={8}> {/* Move the text and buttons down */}
          <Typography variant="h4" component="div">
            Welcome to Mino Stitches
          </Typography>
        </Box>
        <Box mt={2}>
          <CategoryButton onClick={() => handleCategoryClick('Hoop Stitches')}>
            Hoop Stitches
          </CategoryButton>
          <CategoryButton onClick={() => handleCategoryClick('Key Chains')}>
            Key Chains
          </CategoryButton>
          <CategoryButton onClick={() => handleCategoryClick('Jewellery')}>
            Jewellery
          </CategoryButton>
          <CategoryButton onClick={() => handleCategoryClick('Customized')}>
            Customized
          </CategoryButton>
        </Box>
      </BlackBar>
      <ProductContainer>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Our Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: '200px', // Set a fixed height
                      objectFit: 'contain', // Contain image within the box
                      borderRadius: '4px', // Add some rounding for aesthetics
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ marginBottom: '15px', color: '#666' }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" component="div" color="primary" sx={{ marginTop: '10px', fontWeight: 'bold' }}>
                      LKR {product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      sx={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px' }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ProductContainer>
    </Box>
  );
};

export default Products;
