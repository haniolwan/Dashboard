import { useEffect } from 'react';

export default function useOnClickOutside(elementRef, iconRef, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef && elementRef.current &&
        !elementRef.current.contains(event.target)
      ) {
        callback();
      }
      if (elementRef && elementRef.current &&
        !elementRef.current.contains(event.target)
        && (iconRef && !iconRef.current.contains(event.target))) {
        callback();
      }
      return;
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [elementRef, callback, iconRef]);
};