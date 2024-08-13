import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBSpinner
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted',
        text: 'The product has been successfully deleted.',
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the product.',
      });
    }
  };

  return (
    <MDBContainer style={{ color: 'black' }}>
      <MDBRow className="my-4">
        <MDBCol>
          <h2 className="text-center">Manage Products</h2>
          <MDBBtn color="dark" onClick={() => navigate('/admin')} className="mb-4">
            Back to Admin
          </MDBBtn>
          <MDBBtn color="primary" onClick={() => navigate('/add-product')} className="mb-4">
            Add Product
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      {loading ? (
        <div className="text-center">
          <MDBSpinner grow>
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBTable responsive>
                  <MDBTableHead>
                    <tr>
                      <th>Name</th>
                      <th>Price (LKR)</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                        <td>
                          <MDBBtn size="sm" color="info" onClick={() => navigate(`/edit-product/${product.id}`)}>
                            <MDBIcon fas icon="edit" />
                          </MDBBtn>
                          {' '}
                          <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(product.id)}>
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default ManageProducts;
