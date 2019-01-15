/**
			 * This method runs before any other reference
			 */
export function init() {
    if ($ == undefined) {
        if (window.$ == undefined || window.jQuery == undefined) {
            throw new DOMException('jQuery cannot be found');
        } else {
            if (window.jQuery !== undefined) {
                $ = window.jQuery;
            }
        }
    }
};

/**
 * Make given fn first to fire in name event queue
 */
export function bindFirst(name, fn) {
    this.init();

    $.fn.bindFirst = function (name, fn) {
        this.bind(name, fn);

        if (this.data('events') === undefined) {
            return;
        }
        var handlers = this.data('events')[name.split('.')[0]];
        var handler = handlers.pop();
        handlers.splice(0, 0, handler);
    };
};