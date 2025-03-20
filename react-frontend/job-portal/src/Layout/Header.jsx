import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, isAuthenticated, logout } from '../api/UserAPI';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [role, setRole] = useState(0)
  let navigate = useNavigate()

  // Check if the user is logged in using localStorage or a similar mechanism
  const { token, role } = isAuthenticated()
  useEffect(() => {
    if (token) {
      getRole(token)
        .then(data => {
          if (data.error) {
            if(data.error == "jwt expired"){
              localStorage.removeItem('jwt')
              navigate('/login')
            }
          }
        })
    }
  }, []);

  const handleLogout = () => {
    // Remove the token to log out the user
    logout()
    navigate('/login')
  };

  return (
    <div className="flex flex-wrap bg-red-400 justify-between text-white items-center lg:px-40 md:px-20 px-6 py-6">
      <div className="text-2xl font-bold md:text-4xl"><Link to={'/'}>JOB PORTAL</Link></div>
      <button
        className="text-2xl text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✖' : '☰'}
      </button>
      <ul className={`absolute top-16 left-0 w-full bg-red-500 md:bg-transparent md:static md:flex md:w-1/2 justify-evenly mt-4 md:mt-0 transition-all ${isOpen ? 'block' : 'hidden'}`}>
        <li><Link to="/jobs" className="block hover:text-gray-200 md:p-0 px-4 py-2">Jobs</Link></li>
        <li><Link to="/services" className="block hover:text-gray-200 md:p-0 px-4 py-2">Services</Link></li>
        <li><Link to="/about" className="block hover:text-gray-200 md:p-0 px-4 py-2">About</Link></li>
        {
          role == 1 ?
            <li><Link to="/recruiters" className="block hover:text-gray-200 md:p-0 px-4 py-2">Recruiters</Link></li>
            :
            <li><Link to="/company" className="block hover:text-gray-200 md:p-0 px-4 py-2">Company</Link></li>

        }


        {token ? (
          <>
            {
              role != '1' &&
              <li><Link to="/profile" className="block hover:text-gray-200 md:p-0 px-4 py-2">Profile</Link></li>
}
            <li><button
              onClick={handleLogout}
              className="block hover:text-gray-200 md:p-0 px-4 py-2">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="block hover:text-gray-200 md:p-0 px-4 py-2">Login</Link></li>
            <li><Link to="/register" className="block hover:text-gray-200 md:p-0 px-4 py-2">Register</Link></li>
          </>
        )}

        {/* <li><Link to="/upload-resume" className="block hover:text-gray-200 md:p-0 px-4 py-2">Upload Resume</Link></li> */}
      </ul>
    </div>
  );
};

export default Header;
