import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });
  const [file, setFile] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Product not found.',
          });
          navigate('/manage-products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the product.',
        });
        navigate('/manage-products');
      }
    };

    fetchProduct();
  }, [id, db, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditProduct = async () => {
    try {
      let imageURL = formData.image;

      if (file) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        imageURL = await getDownloadURL(storageRef);
      }

      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageURL,
      };

      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, updatedProduct);
      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'Product details have been successfully updated.',
      });
      navigate('/manage-products');
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating product details.',
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol md="8" className="mx-auto">
          <MDBCard>
            <MDBCardBody>
              <h3 className="text-center mb-4">Edit Product</h3>
              <MDBInput label="Product Name" name="name" value={formData.name} onChange={handleChange} className="mb-3" />
              <MDBInput label="Price (LKR)" name="price" type="number" value={formData.price} onChange={handleChange} className="mb-3" />
              <MDBTextArea label="Description" name="description" value={formData.description} onChange={handleChange} className="mb-3" />
              <MDBInput type="file" onChange={handleFileChange} className="mb-3" />
              <MDBBtn color="primary" onClick={handleEditProduct}>
                Save Changes
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EditProduct;
