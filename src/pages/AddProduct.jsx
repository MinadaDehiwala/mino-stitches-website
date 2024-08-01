import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });
  const [file, setFile] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        ...formData,
        price: parseFloat(formData.price),
        image: imageURL,
      };

      await addDoc(collection(db, 'products'), newProduct);
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'Product has been successfully added.',
      });
      navigate('/manage-products');
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the product.',
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol md="8" className="mx-auto">
          <MDBCard>
            <MDBCardBody>
              <h3 className="text-center mb-4">Add Product</h3>
              <MDBInput label="Product Name" name="name" value={formData.name} onChange={handleChange} className="mb-3" />
              <MDBInput label="Price (LKR)" name="price" type="number" value={formData.price} onChange={handleChange} className="mb-3" />
              <MDBTextArea label="Description" name="description" value={formData.description} onChange={handleChange} className="mb-3" />
              <MDBInput type="file" onChange={handleFileChange} className="mb-3" />
              <MDBBtn color="primary" onClick={handleAddProduct}>
                Add Product
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddProduct;
