import * as general from './general.js';

class jslib {
    constructor() {
        this.general = general;
    }
    
    version() {
        return '0.0.1';
    }
}

window.jslib = jslib;