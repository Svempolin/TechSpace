import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupModalProps {
  onClose: () => void;
  onSignup: (data: FormData) => void;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSignup }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignup(formData);
    onClose(); // Close the modal after submission
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal')) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className='modal-header'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id='lastName' value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id='email' value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id='password' value={formData.password} onChange={handleChange} required />
          </div>
          <div className="button-group">
            <button className="signup-button button" type="submit">Signup</button>
            <p>I agree to the terms and use</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
