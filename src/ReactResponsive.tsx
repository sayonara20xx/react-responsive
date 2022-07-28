import React, { useEffect, useState } from 'react';

interface useMediaQueryProps {
  query: string;
}

function useWindowSize(): number[] {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

function useMediaQuery(queryObject: useMediaQueryProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  let size = useWindowSize();

  useEffect(() => {
    let isMatches = window.matchMedia(queryObject.query);
    setIsVisible(() => {
      return isMatches.matches;
    });
  }, [queryObject.query, size]);

  return isVisible;
}

interface mediaQueryProps {
  orientation?: 'portrait' | 'landscape';
  minResolution?: number;
  maxResolution?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: JSX.Element | null;
}

const MediaQuery: (props: mediaQueryProps) => JSX.Element | null = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  let size = useWindowSize();

  useEffect(() => {
    let isShow = true;
    if (props.orientation) {
      isShow = isShow && window.matchMedia(`(orientation: ${props.orientation})`).matches;
    }
    if (props.minResolution) {
      isShow = isShow && window.matchMedia(`(min-resolution: ${props.minResolution}dppx)`).matches;
    }
    if (props.maxResolution) {
      isShow = isShow && window.matchMedia(`(max-resolution: ${props.maxResolution}dppx)`).matches;
    }
    if (props.minWidth) {
      isShow = isShow && window.matchMedia(`(min-width: ${props.minWidth}px)`).matches;
    }
    if (props.maxWidth) {
      isShow = isShow && window.matchMedia(`(max-width: ${props.maxWidth}px)`).matches;
    }
    if (props.minHeight) {
      isShow = isShow && window.matchMedia(`(min-height: ${props.minHeight}px)`).matches;
    }
    if (props.maxHeight) {
      isShow = isShow && window.matchMedia(`(max-height: ${props.maxHeight}px)`).matches;
    }

    setIsVisible(() => {
      return isShow;
    });
  }, [size, props]);

  const renderChildren = (): JSX.Element | undefined => {
    if (props.children && isVisible) return props.children;
  };

  return <>{renderChildren()}</>;
};

export { useMediaQuery };
export default MediaQuery;
