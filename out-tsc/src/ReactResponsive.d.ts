/// <reference types="react" />
interface useMediaQueryProps {
    query: string;
}
declare function useMediaQuery(queryObject: useMediaQueryProps): boolean;
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
declare const MediaQuery: (props: mediaQueryProps) => JSX.Element | null;
export { useMediaQuery };
export default MediaQuery;
