import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, setLogin, setUser } from '../../store/UserSlice';
import { LocateFixed } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';
import { Link, Outlet } from 'react-router-dom';
import config from '../config/config';
export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { city } = useSelector((state) => state.restaurant);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getCurrentUser());
      dispatch(setLogin());
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('auth-token') && isLoggedIn) {
      dispatch(getCurrentUser());
    } else {
      dispatch(setUser({}));
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 md:px-6 px-2 ">
      <div className="flex md:justify-between flex-col space-y-2 md:flex-row items-center col-span-1 col-start-1 md:col-span-12 md:col-start-1 w-full h-auto md:h-60 bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')] md:px-6 py-2 mb-4">
        <div className="flex items-center">
          <img
            src={`${config.BASE_URL}/image/user/${user.image}`}
            alt={user.name}
            className="w-40 h-40 rounded-full object-cover mr-4"
          />

          <div className="flex flex-col">
            <h2 className="text-xl text-white font-semibold">
              {user && user.name}
            </h2>
            <p className="text-base text-white font-normal flex items-center">
              <LocateFixed className="mr-2 mt-2" /> {user.city}
            </p>
          </div>
        </div>

        <div>
          <>
            {isLoggedIn && user ? (
              <>
                <Link
                  to={`/user/edit-profile`}
                  className="text-base text-white bg-red-500 px-2 py-1 rounded-lg opacity-90"
                >
                  Edit Profile
                </Link>
              </>
            ) : (
              <>
                <button className="text-base text-white bg-red-500 px-2 py-1 rounded-lg opacity-90">
                  Follow
                </button>
              </>
            )}
          </>
        </div>
      </div>
      <div className="flex col-span-1 col-start-1 md:col-span-2 md:col-start-1 justify-center md:justify-start">
        <ProfileSidebar />
      </div>
      <div className="flex col-span-1 col-start-1 md:col-span-10 md:col-start-3 px-4 py-4 md:py-0 w-full">
        <Outlet />
      </div>
    </div>
  );
}
