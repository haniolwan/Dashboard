import { useEffect } from 'react';

export default function useOnClickOutside(elementRef) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef && elementRef.current) {
        elementRef.current.add('modal-transition');
      }
      return;
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [elementRef]);
};