import { ShoppingBag, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, logout, setLogin } from '../../store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { addCity } from '../../store/RestaurantSlice';
import { getCartItems } from '../../store/CartSlice';
import { setOrders } from '../../store/OrderSlice';
import { setReviews } from '../../store/ReviewSlice';
import config from '../config/config';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { city } = useSelector((state) => state.restaurant);
  const [action, setAction] = useState('');
  const [ct, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const ref = useRef();
  const openMenus = () => {
    const Nav = document.getElementById('second-nav');
    const firstMenu = document.getElementById('secondMenu');
    Nav.classList.add('hidden');
    firstMenu.classList.remove('hidden');
  };

  const closeModal = (e) => {
    const Nav = document.getElementById('second-nav');
    const firstMenu = document.getElementById('secondMenu');
    Nav.classList.remove('hidden');
    firstMenu.classList.add('hidden');
  };

  const handleSelectBox = (activity) => {
    switch (activity) {
      case 'logout':
        dispatch(setOrders([]));
        dispatch(setReviews([]));
        dispatch(logout());
        break;
      case 'profile':
        navigate(`/user/`);
        break;
      case 'reviews':
        navigate(`/user/`);
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

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(getCurrentUser());
      dispatch(getCartItems());
    }
  }, []);

  return (
    <>
      <div className="flex w-full md:py-2 md:px-6" id="second-nav">
        <div className="flex w-full md:hidden justify-between items-center px-4 py-2">
          <div className="md:hidden">
            <button
              onClick={openMenus}
              className="text-4xl font-semibold text-black"
            >
              &#8801;
            </button>
          </div>
          <Link
            to={'/'}
            className="text-3xl text-black font-extrabold cursor-pointer"
          >
            SWIGATO
          </Link>
        </div>

        <div className="hidden md:flex w-full justify-start items-center">
          <Link
            to={'/'}
            className="md:text-3xl text-black md:font-extrabold cursor-pointer"
          >
            SWIGATO
          </Link>
          <div className="md:flex justify-center items-center bg-white shadow-md border mx-auto rounded-lg">
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
              <option value="">Select city</option>
              <option value="pune">Pune</option>
              <option value="kolhapur">Kolhapur</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hygerabad</option>
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
          <div className="flex flex-wrap space-x-4 items-center">
            {!isLoggedIn ? (
              <>
                <Link
                  to={'/login'}
                  className="font-normal text-[18px] text-gray-400"
                >
                  Login
                </Link>
                <Link
                  to={'/signup'}
                  className="font-normal text-[18px] text-gray-400"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="flex flex-wrap space-x-3">
                  <NavLink
                    to={`/${city}/user/cart`}
                    className={({ isActive }) =>
                      isActive
                        ? 'flex  items-center space-y-0 text-xl text-pink-500 cursor-pointer mt-1'
                        : 'flex  items-center space-y-0 text-xl text-gray-500 cursor-pointer mt-1'
                    }
                  >
                    <ShoppingBag className="mt-2" />
                    <p className="">{cartItems.length}</p>
                  </NavLink>

                  <div className="flex items-center space-x-1">
                    <select
                      name="action"
                      id="action"
                      value={action}
                      onChange={(e) => {
                        setAction(e.target.value);
                        handleSelectBox(e.target.value);
                      }}
                      className="text-black text-base px-1 py-1 w-auto border rounded-md"
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile modal */}
      <div
        className="w-full md:hidden hidden bg-white min-h-screen"
        id="secondMenu"
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
              <Link to={'/login'} className="text-xl text-gray-400">
                Login
              </Link>
              <Link to={'/signup'} className="text-xl text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to={'/user/'}
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                }}
              >
                Profile
              </Link>

              <Link
                to={'/user/bookmarks'}
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                }}
              >
                Bookmarks
              </Link>
              <Link
                to={'/user/'}
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
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
        <div className="absolute md:top-[60px] top-[60px] w-full grid grid-cols-1 md:grid-cols-12 justify-center ">
          <div className="col-span-1 col-start-1 md:col-span-6 md:col-start-4 flex flex-col bg-white border md:px-4 rounded-lg space-y-1">
            {searchedResult &&
              searchedResult.map((result, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={`/${result.address.city}/hotel/${result._id}`}
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
