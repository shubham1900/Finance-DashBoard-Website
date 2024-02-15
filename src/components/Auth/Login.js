import React, { useRef, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import '../../components/Dash.css';

function Login() {
   const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isRegistering) {
      try {
        localStorage.setItem("emailData", email);
        localStorage.setItem("passwordData", password);
        navigate('/home');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration failure
      }
    } else {
      // Login logic goes here
      if (email === "abc@gmail.com" && password === "12345") {
        localStorage.setItem("emailData", email);
        localStorage.setItem("passwordData", password);
        navigate('/home');
      }
    }
  };
  
  return (
    <div className="login-container">
      <div className=" glassmorphism">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" placeholder="Email" ref={emailRef} />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" ref={passwordRef} />
        </div>
        <button type="submit" className="login-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p>{isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}</p>
      <button className="toggle-button" onClick={handleToggleRegister}>
        {isRegistering ? 'Login Instead' : 'Register Instead'}
      </button>
      <div className="social-icons">
      <InstagramIcon /><FacebookIcon />
      </div>
    </div>
    </div>
  );
}

export default Login;
