/// <reference types="react" />
interface UseMediaQueryProps {
    query: string | null;
}
declare function useMediaQuery(queryObject: UseMediaQueryProps): boolean;
declare type RenderProps = (matches: boolean) => JSX.Element;
declare type ChildrenType = JSX.Element | JSX.Element[] | string | RenderProps | null;
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
declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
declare type MediaQueryProps = RequireAtLeastOne<MediaQueryPropsTemplate, 'orientation' | 'minResolution' | 'maxResolution' | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'>;
declare const MediaQuery: (props: MediaQueryProps) => JSX.Element | null;
export { useMediaQuery };
export default MediaQuery;
