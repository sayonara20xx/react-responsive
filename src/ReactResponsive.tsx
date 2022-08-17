import React, { useEffect, useState } from 'react';

interface UseMediaQueryProps {
  query: string;
}

function useMediaQuery(queryObject: UseMediaQueryProps) {
  const [isQueryMatching, setIsQueryMatching] = useState(() => {
    return window.matchMedia(queryObject.query).matches;
  });

  useEffect(() => {
      const tempQueryList = window.matchMedia(queryObject.query);
      tempQueryList.onchange = (ev) => {
        setIsQueryMatching(() => ev.matches);
    }
  }, [queryObject.query]);

  return isQueryMatching;
}

type RenderProps = (matches: boolean) => JSX.Element;
type ChildrenType = React.ReactNode | RenderProps;

interface MediaQueryPropsTemplate {
  orientation?: 'portrait' | 'landscape';
  minResolution?: number;
  maxResolution?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children: ChildrenType;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys];

type MediaQueryProps = RequireAtLeastOne<MediaQueryPropsTemplate, Exclude<keyof MediaQueryPropsTemplate, 'children'>>;

const MediaQuery: (props: MediaQueryProps) => JSX.Element | null = ({ children, ...props }) => {
  const [isQueryMatching, setIsQueryMatching] = useState(false);

  const getStringQuery = () => {
    let strings = Object.entries(props)
      .map(([key, value]) => {
        const name = key.replace(/[A-Z]/, (match) => {return '-' + match.toLowerCase(); });
        let unit = '';

        if (name.includes('resolution')) unit = 'dppx';
        if (name.includes('width') || name.includes('height')) unit = 'px';

        return `(${name}: ${value}${unit})`;
      });

    return strings.join(' and ');
  };

  const queryString = getStringQuery();
  const isMatched = useMediaQuery({query: queryString});

  useEffect(() => {
    setIsQueryMatching(() => {
      return isMatched;
    });
  }, [isMatched, props]);

  const renderChildren = (): ChildrenType => {
    if (typeof(children) === 'function') return children(isQueryMatching);
    if (children && isQueryMatching) return children;

    return null;
  };

  return <>{renderChildren()}</>;
};

export { useMediaQuery };
export default MediaQuery;
