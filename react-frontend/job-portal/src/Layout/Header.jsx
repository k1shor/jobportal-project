import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, isAuthenticated, logout } from '../api/UserAPI';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(0)
  let navigate = useNavigate()

  // Check if the user is logged in using localStorage or a similar mechanism
  const { token } = isAuthenticated()
  useEffect(() => {
    getRole(token)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        setRole(data.data)
      })
  }, []);

  const handleLogout = () => {
    // Remove the token to log out the user
    logout()
    navigate('/login')
  };

  return (
    <div className="bg-red-400 px-6 md:px-20 lg:px-40 py-6 flex flex-wrap justify-between items-center text-white">
      <div className="text-2xl md:text-4xl font-bold"><Link to={'/'}>JOB PORTAL</Link></div>
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>
      <ul className={`absolute top-16 left-0 w-full bg-red-500 md:bg-transparent md:static md:flex md:w-1/2 justify-evenly mt-4 md:mt-0 transition-all ${isOpen ? 'block' : 'hidden'}`}>
        <li><Link to="/jobs" className="block px-4 py-2 md:p-0 hover:text-gray-200">Jobs</Link></li>
        <li><Link to="/services" className="block px-4 py-2 md:p-0 hover:text-gray-200">Services</Link></li>
        {
          role == 1 ?
            <li><Link to="/recruiters" className="block px-4 py-2 md:p-0 hover:text-gray-200">Recruiters</Link></li>
            :
            <li><Link to="/company" className="block px-4 py-2 md:p-0 hover:text-gray-200">Company</Link></li>

        }


        {token ? (
          <>
            <li><Link to="/profile" className="block px-4 py-2 md:p-0 hover:text-gray-200">Profile</Link></li>
            <li><button
              onClick={handleLogout}
              className="block px-4 py-2 md:p-0 hover:text-gray-200">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="block px-4 py-2 md:p-0 hover:text-gray-200">Login</Link></li>
            <li><Link to="/register" className="block px-4 py-2 md:p-0 hover:text-gray-200">Register</Link></li>
          </>
        )}

        {/* <li><Link to="/upload-resume" className="block px-4 py-2 md:p-0 hover:text-gray-200">Upload Resume</Link></li> */}
      </ul>
    </div>
  );
};

export default Header;
