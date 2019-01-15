/**
 * General purpose utilities
 */

/**
* Returns true if variable is an array, false otherwise
*/
export function isArray(variable) {
    if (variable.constructor === Array) {
        return true;
    }

    return false;
}

/**
 * If condition is true feed value to method and return the value, otherwise return only the
 * value (without any modifications on it)
 */
export function returnIf(condition, method, value) {
    if (condition == true) {
        return method(value);
    }
    return value;
};

/**
 * Check if arg is a valid timestamp
 */
export function isTimestamp(arg) {
    if (isNaN(arg)) {
        return false;
    }

    if (arg.toString().length != 14 && arg.toString().length != 13) {
        return false;
    }

    return true;
};