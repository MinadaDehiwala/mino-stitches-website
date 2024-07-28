import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';

const MyOrdersContainer = styled(Box)({
  padding: '40px',
  backgroundColor: '#f5f7fa',
  minHeight: '100vh',
  marginTop: '80px', // Added margin top to bring the page down
});

const OrderList = styled(List)({
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const orders = [
  {
    id: 1,
    number: 'ORD123456',
    date: '2024-07-01',
    items: [
      { name: 'Product 1', image: p1 },
      { name: 'Product 2', image: p2 },
    ],
    total: 'LKR 4998',
  },
  {
    id: 2,
    number: 'ORD123457',
    date: '2024-07-10',
    items: [{ name: 'Product 3', image: p3 }],
    total: 'LKR 3999',
  },
  {
    id: 3,
    number: 'ORD123458',
    date: '2024-07-15',
    items: [
      { name: 'Product 1', image: p1 },
      { name: 'Product 2', image: p2 },
      { name: 'Product 3', image: p3 },
    ],
    total: 'LKR 12996',
  },
];

const MyOrders = () => {
  return (
    <MyOrdersContainer>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        My Orders
      </Typography>
      <OrderList>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Order Number: ${order.number}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Date: {order.date}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary">
                      Items:
                    </Typography>
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar src={item.image} />
                          </ListItemAvatar>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography component="span" variant="body2" color="primary">
                      Total: {order.total}
                    </Typography>
                  </>
                }
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  style={{ marginBottom: '10px' }}
                >
                  Edit
                </Button>
                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </OrderList>
    </MyOrdersContainer>
  );
};

export default MyOrders;
