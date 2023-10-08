import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, logout, setLogin } from '../../store/Seller/UserSlice';
import { X } from 'lucide-react';
export default function SellerNavbar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const ref = useRef();

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

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
      dispatch(getCurrentUser());
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <div
        id="nav_one"
        className="w-full flex flex-col h-14 bg-gray-50 md:px-4 px-2 md:h-20  md:bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')] md:object-cover "
      >
        <div className="flex justify-between items-center md:hidden">
          <Link
            to={'/partner-with-us'}
            className="text-xl font-extrabold text-black cursor-pointer"
          >
            SWIGATO
          </Link>
          <div className="md:hidden">
            <Link onClick={openMenus} className="text-4xl font-semibold black">
              &#8801;
            </Link>
          </div>
        </div>

        <div className="md:flex justify-between hidden pt-2">
          <Link
            to={'/partner-with-us'}
            className="text-2xl font-extrabold text-white cursor-pointer"
          >
            SWIGATO
          </Link>
          <div className="flex space-x-3">
            {!isLoggedIn && (
              <>
                <Link
                  to={'/'}
                  className="px-2 py-1 rounded-md text-white text-[16px]  bg-pink-500"
                >
                  Explore Swigato
                </Link>
                <Link
                  to={'/seller/login'}
                  className="px-2 py-1 rounded-md text-white text-[16px] border"
                >
                  Login
                </Link>
                <Link
                  to={'/seller/signup'}
                  className="px-2 py-1 text-white text-base bg-blue-500 rounded-md"
                >
                  Create Account
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to={'/partner-with-us/home'}
                  className="px-2 py-1 rounded-md text-white text-[16px]"
                >
                  Home
                </Link>
                <button
                  className="px-2 py-1 rounded-md text-white text-[16px] border"
                  onClick={(e) => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
                <Link
                  to={'/partner-with-us/home'}
                  className="px-2 py-1 rounded-md text-white text-[16px] border"
                >
                  {user && user.name}
                </Link>
              </>
            )}
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
              <Link to={'/'} className="text-xl text-gray-400">
                Explore Swigato
              </Link>
              <Link to={'/seller/login'} className="text-xl text-gray-400">
                Login
              </Link>
              <Link to={'/seller/signup'} className="text-xl text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to={'/Partner-with-us/home/add-resto'}
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                }}
              >
                Add Restaurant
              </Link>

              <Link
                to={'/Partner-with-us/home/'}
                className="text-xl text-gray-400"
                onClick={(e) => {
                  closeModal();
                }}
              >
                Home
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
    </>
  );
}
