import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, getUsersReview } from '../../store/ReviewSlice';
import { useParams } from 'react-router-dom';
import Review from './Review';

export default function Reviews() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { total } = useSelector((state) => state.review);
  const { reviews } = useSelector((state) => state.review);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { resto } = useParams();

  useEffect(() => {
    if (resto) dispatch(getReviews({ page: 1, restaurant: resto }));
    if (!resto && localStorage.getItem('auth-token')) {
      dispatch(getUsersReview({ page: 1 }));
    }
  }, []);

  const handleNext = () => {
    if (resto) {
      if (page < total) {
        setPage(page + 1);
        dispatch(getReviews({ page: page + 1, restaurant: resto }));
      }
    } else {
      if (page < total && isLoggedIn) {
        setPage(page + 1);
        dispatch(getUsersReview({ page: page + 1 }));
      }
    }
  };

  const handlePrevious = () => {
    if (resto) {
      if (page !== 1) {
        setPage(page - 1);
        dispatch(getReviews({ page: page - 1, restaurant: resto }));
      }
    } else {
      if (page !== 1 && isLoggedIn) {
        setPage(page - 1);
        dispatch(getUsersReview({ page: page - 1 }));
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        <div className="col-span-1 col-start-1 md:col-span-12 md:col-start-1 flex flex-col space-y-2 w-full">
          {/* Review section */}
          {reviews &&
            reviews.map((review, index) => {
              return (
                <div className="w-full flex-col" key={review._id}>
                  <Review review={review} />
                  <hr />
                </div>
              );
            })}

          {/* pegination section */}
          {reviews.length > 0 && (
            <div className="flex justify-center items-center space-x-2 ">
              <button
                onClick={handlePrevious}
                className={`text-md bg-pink-500 px-2 py-1 rounded-lg text-white ${
                  page === 1 ? 'disabled' : ''
                }`}
              >
                ◀️Previous
              </button>
              <button
                onClick={handleNext}
                className="text-md bg-pink-500 px-2 py-1 rounded-lg text-white"
              >
                Next▶️
              </button>
            </div>
          )}

          {/* No review section */}
          {reviews.length === 0 && (
            <div className="flex flex-col justify-center items-center space-x-2 w-full">
              <h1 className="text-xl text-black font-semibold">
                Reviews not available
              </h1>
              <img
                src="https://b.zmtcdn.com/webFrontend/691ad4ad27a5804a3033977d45390c811584432410.png"
                alt="no reviews"
                className="w-44 h-44 mt-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
