import React, { useEffect, useState } from 'react';

interface UseMediaQueryProps {
  query: string;
}

function useMediaQuery(queryObject: UseMediaQueryProps) {
  const [isQueryMatching, setIsQueryMatching] = useState(() => {
    return window.matchMedia(queryObject.query).matches;
  });

  useEffect(() => {
    if (queryObject.query !== null) {
      const tempQueryList = window.matchMedia(queryObject.query);
      tempQueryList.onchange = (ev) => {
        setIsQueryMatching(() => ev.matches);
      };
    }
  }, [queryObject.query]);

  return isQueryMatching;
}

type RenderProps = (matches: boolean) => JSX.Element;
type ChildrenType = JSX.Element | JSX.Element[] | string | RenderProps | null;

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

interface QueryNames {
  [orientation: string]: string[];
  minResolution: string[];
  maxResolution: string[];
  minWidth: string[];
  maxWidth: string[];
  minHeight: string[];
  maxHeight: string[];
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys];

type MediaQueryProps = RequireAtLeastOne<MediaQueryPropsTemplate, Exclude<keyof MediaQueryPropsTemplate, 'children'>>;

const MediaQuery: (props: MediaQueryProps) => JSX.Element | null = (props) => {
  const [isQueryMatching, setIsQueryMatching] = useState(false);

  const queriesPropNameAndUnit : QueryNames = {
    orientation: ['orientation', ''],
    minResolution: ['min-resolution', 'dppx'],
    maxResolution: ['max-resolution', 'dppx'],
    minWidth: ['min-width', 'px'],
    maxWidth: ['max-width', 'px'],
    minHeight: ['min-height', 'px'],
    maxHeight: ['max-height', 'px'],
  };

  const getStringQuery = () : string => {
    let strings = Object.entries(props)
      .filter((elem) => {return elem[0] !== 'children';})
      .map((property) => {
      const nameAndUnit: string[] = queriesPropNameAndUnit[property[0]];
      return `(${nameAndUnit[0]}: ${property[1]}${nameAndUnit[1]})`;
    });

    return strings.reduce((a, b) => {
      return [a, b].join(' ');
    });
  };

  const queryString = getStringQuery();
  const isMatched = useMediaQuery({query: queryString});

  useEffect(() => {
    setIsQueryMatching(() => {
      return isMatched;
    });
  }, [isMatched, props]);

  const renderChildren = (): ChildrenType => {
    if (typeof(props.children) === 'function') return props.children(isQueryMatching);
    if (props.children && isQueryMatching) return props.children;

    return null;
  };

  return <>{renderChildren()}</>;
};

export { useMediaQuery };
export default MediaQuery;
