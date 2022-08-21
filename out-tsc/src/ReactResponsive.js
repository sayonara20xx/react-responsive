import React, { useEffect, useState } from 'react';
function useMediaQuery(queryObject) {
    const [isQueryMatching, setIsQueryMatching] = useState(() => {
        if (queryObject.query !== null) {
            return window.matchMedia(queryObject.query).matches;
        }
        return false;
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
const MediaQuery = (props) => {
    const [isQueryMatching, setIsQueryMatching] = useState(false);
    const queriesPropNameAndUnit = {
        orientation: ['orientation', ''],
        minResolution: ['min-resolution', 'dppx'],
        maxResolution: ['max-resolution', 'dppx'],
        minWidth: ['min-width', 'px'],
        maxWidth: ['max-width', 'px'],
        minHeight: ['min-height', 'px'],
        maxHeight: ['max-height', 'px'],
    };
    const getStringQuery = () => {
        let strings = Object.entries(props).map((property) => {
            if (property[0] !== 'children') {
                const nameAndUnit = queriesPropNameAndUnit[property[0]];
                return `(${nameAndUnit[0]}: ${property[1]}${nameAndUnit[1]})`;
            }
            return null;
        });
        strings = strings.filter(elem => { return elem !== null; });
        return strings.reduce((a, b) => {
            return a + ' and ' + b;
        });
    };
    const queryString = getStringQuery();
    const isMatched = useMediaQuery({ query: queryString });
    //debugger; // eslint-disable-line
    useEffect(() => {
        setIsQueryMatching(() => {
            return isMatched;
        });
    }, [isMatched, props]);
    const renderChildren = () => {
        if (typeof (props.children) === 'function')
            return props.children(isQueryMatching);
        if (props.children && isQueryMatching)
            return props.children;
    };
    return React.createElement(React.Fragment, null, renderChildren());
};
export { useMediaQuery };
export default MediaQuery;
