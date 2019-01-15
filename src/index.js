import * as general from './general.js';
import * as jalali from './jalali.js';
import * as numeral from './numeral.js';
import * as date from './date.js';
import * as jquery from './jquery.js';

class jslib {
    constructor() {
        this.general = general;
        this.jalali = jalali;
        this.numeral = numeral;
        this.date = date;
        this.jquery = jquery;
    }

    version() {
        return '0.0.5';
    }
}

window.jslib = new jslib();