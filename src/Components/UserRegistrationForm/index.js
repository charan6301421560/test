import React, { useState } from 'react';
import './index.css';

const UserRegistrationForm = ({ onStartGame }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    level: 'Easy', // Default level value
  });

  const [showWarning, setShowWarning] = useState(false); // Warning for Start Game
  const [inputBlurErrors, setInputBlurErrors] = useState({}); // Errors for input onBlur

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setInputBlurErrors({ ...inputBlurErrors, [name]: '' }); // Clear onBlur error when input changes
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user.name) {
      newErrors.name = 'Name is required.';
    }

    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = 'Valid email is required.';
    }

    if (!user.mobile || !/^\d{10}$/.test(user.mobile)) {
      newErrors.mobile = 'Valid 10-digit mobile number is required.';
    }

    if (!user.level) {
      newErrors.level = 'Choose a level.'; // Updated label
    }

    if (Object.keys(newErrors).length === 0) {
      onStartGame(user.level);
    } else {
      setShowWarning(true); // Show warning if there are validation errors
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setInputBlurErrors({ ...inputBlurErrors, [name]: '*This field is required.' });
    } else {
      setInputBlurErrors({ ...inputBlurErrors, [name]: '' });
    }
  };

  return (
    <div className="registration-form left-aligned"> {/* Added left-aligned class */}
      <h2>Registration</h2>
      
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder='Name'
          />
          {inputBlurErrors.name && <span className="error">{inputBlurErrors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Email"
          />
          {inputBlurErrors.email && <span className="error">{inputBlurErrors.email}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="Mobile Number"
          />
          {inputBlurErrors.mobile && <span className="error">{inputBlurErrors.mobile}</span>}
        </div>
        <div className="form-group">
          <label>Choose Level:</label>
          <div>
            <label>
              <input
                type="radio"
                name="level"
                value="Easy"
                checked={user.level === 'Easy'}
                onChange={handleInputChange}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="Medium"
                checked={user.level === 'Medium'}
                onChange={handleInputChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="Hard"
                checked={user.level === 'Hard'}
                onChange={handleInputChange}
              />
              Hard
            </label>
          </div>
          {inputBlurErrors.level && <span className="error">{inputBlurErrors.level}</span>}
        </div>
        {showWarning && (
          <div className="warning">
            *Please fill in all the details.
          </div>
        )}
      </div>
      <button onClick={validateForm}>Register</button>
    </div>
  );
};

export default UserRegistrationForm;
