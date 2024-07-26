// src/pages/Signup.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Signup.css';

// Form validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" {...register('firstName')} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" {...register('lastName')} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" {...register('phoneNumber')} />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        <div className="form-group">
          <label>Address (optional)</label>
          <input type="text" {...register('address')} />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" {...register('profilePic')} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
