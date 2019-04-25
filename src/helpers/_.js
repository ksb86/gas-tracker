// Use the follwing to add functions to this file
// https://www.sitepoint.com/lodash-features-replace-es6/
// https://youmightnotneed.com/lodash/

// use it like this
// _get(() => obj.a.lot.of.properties);
module.exports = fn => {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
};
