import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBTextArea, MDBIcon, MDBSpinner
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [editData, setEditData] = useState({});
  const [file, setFile] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [db]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAddProduct = async () => {
    try {
      let imageURL = '';
      if (file) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        imageURL = await getDownloadURL(storageRef);
      }

      const newProduct = {
        ...editData,
        image: imageURL
      };

      await addDoc(collection(db, 'products'), newProduct);
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'Product has been successfully added.'
      });
      fetchProducts();
      setEditData({});
      setFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the product.'
      });
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setEditData(product);
    toggleModal();
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted',
        text: 'The product has been successfully deleted.'
      });
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the product.'
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditSubmit = async () => {
    try {
      let imageURL = editData.image;

      if (file) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        imageURL = await getDownloadURL(storageRef);
      }

      const updatedProduct = {
        ...editData,
        image: imageURL
      };

      const productRef = doc(db, 'products', currentProduct.id);
      await updateDoc(productRef, updatedProduct);
      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'Product details have been successfully updated.'
      });
      setProducts(products.map(product => (product.id === currentProduct.id ? { ...product, ...updatedProduct } : product)));
      toggleModal();
      setFile(null);
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating product details.'
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol>
          <h2 className="text-center">Manage Products</h2>
          <MDBBtn color="secondary" onClick={() => navigate('/admin')} className="mb-4">
            Back to Admin
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
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                        <td>
                          <MDBBtn size="sm" color="info" onClick={() => handleEditClick(product)}>
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
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Edit Product</MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="Product Name" name="name" value={editData.name || ''} onChange={handleEditChange} className="mb-3" />
          <MDBInput label="Price (LKR)" name="price" value={editData.price || ''} onChange={handleEditChange} className="mb-3" />
          <MDBTextArea label="Description" name="description" value={editData.description || ''} onChange={handleEditChange} className="mb-3" />
          <MDBInput type="file" onChange={handleFileChange} className="mb-3" />
          <MDBBtn color="primary" onClick={handleEditSubmit}>Save Changes</MDBBtn>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default ManageProducts;
