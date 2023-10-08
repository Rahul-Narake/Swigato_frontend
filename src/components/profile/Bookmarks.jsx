import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookmarkResto from './BookmarkResto';
import { getBookmarks } from '../../store/BookmarkSlice';
export default function Bookmarks() {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getBookmarks());
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 w-full">
        {bookmarks.length > 0 &&
          bookmarks.map((bookmark) => {
            return (
              <BookmarkResto
                key={bookmark._id}
                restaurant={bookmark.restaurant}
                id={bookmark.id}
              />
            );
          })}
      </div>
    </>
  );
}
