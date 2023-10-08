import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../store/RestaurantSlice';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, setLogin } from '../store/UserSlice';
import config from './config/config';
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.restaurant);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [ct, setCity] = useState('');
  const [action, setAction] = useState('');
  const [search, setSearch] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const ref = useRef();
  useEffect(() => {
    setCity(city);
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
      dispatch(getCurrentUser());
    }
  }, []);

  const openMenus = () => {
    const Nav = document.getElementById('nav_one');
    const firstMenu = document.getElementById('firstMenu');
    Nav.classList.add('hidden');
    firstMenu.classList.remove('hidden');
  };

  const closeModal = (e) => {
    const Nav = document.getElementById('nav_one');
    const firstMenu = document.getElementById('firstMenu');
    Nav.classList.remove('hidden');
    firstMenu.classList.add('hidden');
  };

  const handleSelectBox = (act) => {
    switch (act) {
      case 'logout':
        dispatch(logout());
        break;
      case 'profile':
        navigate(`/user`);
        break;
      case 'reviews':
        navigate(`/user`);
        break;
      case 'bookmarks':
        navigate(`/user/bookmarks`);
        break;

      default:
        break;
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/resto/?search=${search}`,
      {
        method: 'GET',
      }
    );
    const result = await response.json();
    setSearchedResult(result.searchedRestaurants);
  };

  return (
    <>
      <div
        className="flex flex-col  w-full h-[400px] nav  bg-indigo-600 px-2 py-4"
        id="nav_one"
      >
        <div className="flex md:justify-end">
          <div className="md:hidden">
            <Link
              className="text-4xl font-semibold text-white"
              onClick={openMenus}
            >
              &#8801;
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex text-white pr-44 justify-between space-x-8 text-xl font-light items-center">
              {!isLoggedIn ? (
                <>
                  <Link to={'/partner-with-us'} className="cursor-pointer">
                    Add Restaurant
                  </Link>
                  <Link to={'/login'} className="cursor-pointer">
                    Login
                  </Link>
                  <Link to={'/signup'} className="cursor-pointer">
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link to={'/seller/signup'} className="cursor-pointer">
                    Add Restaurant
                  </Link>
                  <div className="flex items-center space-x-1">
                    {user && user.image && (
                      <img
                        src={`${config.BASE_URL}/image/user/${user.image}`}
                        alt="profile"
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <select
                      name="action"
                      id="action"
                      value={action}
                      onChange={(e) => {
                        setAction(e.target.value);
                        handleSelectBox(e.target.value);
                      }}
                      className="text-black backdrop-blur-3xl text-base px-1 py-1 w-auto"
                    >
                      <option value="" className="text-base">
                        Menu
                      </option>
                      <option value="profile" className="text-base">
                        Profile
                      </option>
                      <option value="bookmarks" className="text-base">
                        Bookmarks
                      </option>
                      <option value="reviews" className="text-base">
                        Reviews
                      </option>
                      <option value="logout" className="text-base">
                        Logout
                      </option>
                    </select>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:justify-start justify-center items-center  md:top-16 top-10 md:mt-10 mt-6">
          <h1 className="w-[230px] h-16 font-extrabold text-7xl text-white">
            SWIGATO
          </h1>
          <p className="text-[30px] font-normal text-white mt-6">
            Discover the best food & drinks in {city && city.toUpperCase()}
          </p>
          <div className="md:flex justify-center items-center mt-6 mx-auto">
            <select
              name="city"
              id="city"
              value={ct}
              onChange={(e) => {
                setCity(e.target.value);
                dispatch(addCity(e.target.value));
              }}
              className="w-[100px] md:w-[150px] h-12 rounded-l-lg focus:outline-none pl-3"
            >
              <option value="">City</option>
              <option value="pune">Pune</option>
              <option value="kolhapur">Kolhapur</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
            <input
              type="text"
              id="search"
              name="search"
              onChange={handleSearch}
              className="w-[300px] md:w-[450px] h-12 rounded-r-lg px-4 focus:outline-none"
              placeholder="Search for restaurant, cuisine or a dish"
            />
          </div>
        </div>
      </div>

      <div
        className="w-full md:hidden hidden bg-white min-h-screen"
        id="firstMenu"
      >
        <div className="w-full flex justify-between items-center p-4">
          <button className="font-bold" onClick={closeModal} ref={ref}>
            <X />
          </button>
          <h1 className="text-4xl font-extrabold text-black">SWIGATO</h1>
        </div>
        <ul className="flex flex-col mx-4 space-y-2 mt-4">
          {!isLoggedIn ? (
            <>
              <li className="text-xl text-gray-400">Add Resturants</li>
              <Link to={'/login'} className="text-xl text-gray-400">
                Login
              </Link>
              <Link to={'/signup'} className="text-xl text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link className="text-xl text-gray-400">Add Resturants</Link>
              <Link
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                  navigate('/user/');
                }}
              >
                Profile
              </Link>

              <Link
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                  navigate('/user/bookmarks');
                }}
              >
                Bookmarks
              </Link>
              <Link
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                  navigate('/user/');
                }}
              >
                Reviews
              </Link>
              <Link
                className="text-xl text-gray-400"
                onClick={(e) => {
                  dispatch(logout());
                  ref.current.click();
                }}
              >
                Logout
              </Link>
            </>
          )}
        </ul>
      </div>

      {search && (
        <div className="absolute md:top-[310px] top-[380px] w-full grid grid-cols-1 md:grid-cols-12 justify-center ">
          <div className="col-span-1 col-start-1 md:col-span-6 md:col-start-4 flex flex-col bg-white border md:px-4 rounded-lg space-y-1">
            {searchedResult &&
              searchedResult.map((result, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={`${result.address.city}/hotel/${result._id}`}
                      className="flex space-x-2 cursor-pointer"
                      key={result._id}
                    >
                      <img
                        src={`${config.BASE_URL}/image/resto/${result.image}`}
                        alt={result.name}
                        className="w-12 h-12 rounded-md"
                      />
                      <div className="flex flex-col space-y-1">
                        <h2 className="text-base font-semibold ">
                          {result.name}
                        </h2>
                        {result.address && (
                          <p className="text-gray-500 text-base">
                            {result.address.area}, {result.address.city}
                          </p>
                        )}
                      </div>
                    </Link>
                    <hr key={index} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
