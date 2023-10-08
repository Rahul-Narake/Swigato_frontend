import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

function SellerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token') && isLoggedIn) {
      navigate('/partner-with-us/home');
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full focus:outline-none focus:border-blue-300 rounded-lg p-2 border"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <Link className="text-blue-500 mt-8 text-center" to={'/seller/signup'}>
          Don't have account?
        </Link>
      </div>
    </div>
  );
}

export default SellerLogin;
