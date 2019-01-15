/**
 * Takes date and tries to find out which character is being used as a delimiter
 */
export function guessDelimiter(date) {
    var d = jslib.numeral.toLatin(date);
    var delimiter = '-';

    if (d.split(delimiter).length != 3) {
        delimiter = '/';
    }

    if (d.split(delimiter).length != 3) {
        // date doesn't seem like a date
        return false;
    }

    return delimiter;
};