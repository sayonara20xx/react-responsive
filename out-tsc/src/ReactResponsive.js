import React, { useEffect, useState } from 'react';
function useWindowSize() {
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
function useMediaQuery(queryObject) {
    const [isVisible, setIsVisible] = useState(false);
    let size = useWindowSize();
    useEffect(() => {
        let isMatches = window.matchMedia(queryObject.query);
        setIsVisible(() => {
            return isMatches.matches;
        });
    }, [queryObject.query, size]);
    return isVisible;
}
const MediaQuery = (props) => {
    const [isVisible, setIsVisible] = useState(false);
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
    const renderChildren = () => {
        if (props.children && isVisible)
            return props.children;
    };
    return React.createElement(React.Fragment, null, renderChildren());
};
export { useMediaQuery };
export default MediaQuery;
