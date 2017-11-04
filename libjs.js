var ehsanx64_libjs = (function() {
	// Keep current version of library
	var version = 0.1;

	/**
	 * General purpose utilities
	 */
	var General = (function() {
		var main = {
			/**
			 * Returns true if variable is an array, false otherwise
			 */
			isArray: function(variable) {
				if (variable.constructor === Array) {
					return true;
				}

				return false;
			},

			/**
			 * If condition is true feed value to method and return the value, otherwise return only the
			 * value (without any modifications on it)
			 */
			returnIf: function(condition, method, value) {
				if (condition == true) {
					return method(value);
				}
				return value;
			},


			isTimestamp: function(arg) {
				if (isNaN(arg)) {
					return false;
				}

				if (arg.toString().length != 14 && arg.toString().length != 13) {
					return false;
				}

				return true;
			}
		};

		return main;
	}());

	/**
	 * This class contains Persian related methods like numeral and date conversion eg.
	 */
	var Persian = (function() {
		var Numeral = (function() {
			var main = {
				toLatin: function(number) {
					var digits = [
						'۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰',
						'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'

					];
					var nstr = number.toString();
					var out = "";
					for (var i = 0; i < nstr.length; i++) {
						if (digits.indexOf(nstr.charAt(i)) == -1 || digits.indexOf(nstr.charAt(i)) > 10) {
							out += nstr.charAt(i);
							continue;
						}
						out += digits[digits.indexOf(nstr.charAt(i)) + 11];
					}
					return out;
				},
				toPersian: function(number) {
					var digits = [
						'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-',
						'۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰', '-'
					];
					var nstr = number.toString();
					var out = "";
					for (var i = 0; i < nstr.length; i++) {
						if (digits.indexOf(nstr.charAt(i)) == -1) {
							out += nstr.charAt(i);
							continue;
						}
						out += digits[digits.indexOf(nstr.charAt(i)) + 12];
					}
					return out;
				}
			};

			return main;
		}());

		var Date = (function() {
			var dateDelimiters = ['/', '-'];
			var generalDelimiter = '-';
			var g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			var j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);

			function div(a,b) {
				return Math.floor(a/b);
			}

			function remainder(a,b) {
				return a - div(a,b)*b;
			}

			function gregorian_to_jalali(g /* array containing year, month, day*/ ) {
				var gy, gm, gd;
				var jy, jm, jd;
				var g_day_no, j_day_no;
				var j_np;

				var i;

				gy = g[0]-1600;
				gm = g[1]-1;
				gd = g[2]-1;

				g_day_no = 365*gy+div((gy+3),4)-div((gy+99),100)+div((gy+399),400);
				for (i=0;i<gm;++i)
					g_day_no += g_days_in_month[i];
				if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
				/* leap and after Feb */
					++g_day_no;
				g_day_no += gd;

				j_day_no = g_day_no-79;

				j_np = div(j_day_no, 12053);
				j_day_no = remainder (j_day_no, 12053);

				jy = 979+33*j_np+4*div(j_day_no,1461);
				j_day_no = remainder (j_day_no, 1461);

				if (j_day_no >= 366) {
					jy += div((j_day_no-1),365);
					j_day_no = remainder ((j_day_no-1), 365);
				}

				for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
					j_day_no -= j_days_in_month[i];
				}
				jm = i+1;
				jd = j_day_no+1;

				return new Array(jy, jm, jd);
			}

			function jalali_to_gregorian(j /* array containing year, month, day*/ ) {
				var gy, gm, gd;
				var jy, jm, jd;
				var g_day_no, j_day_no;
				var leap;

				var i;

				jy = j[0]-979;
				jm = j[1]-1;
				jd = j[2]-1;

				j_day_no = 365*jy + div(jy,33)*8 + div((remainder (jy, 33)+3),4);
				for (i=0; i < jm; ++i)
					j_day_no += j_days_in_month[i];

				j_day_no += jd;

				g_day_no = j_day_no+79;

				gy = 1600 + 400*div(g_day_no,146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
				g_day_no = remainder (g_day_no, 146097);

				leap = 1;
				if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
				{
					g_day_no--;
					gy += 100*div(g_day_no,36524); /* 36524 = 365*100 + 100/4 - 100/100 */
					g_day_no = remainder (g_day_no, 36524);

					if (g_day_no >= 365)
						g_day_no++;
					else
						leap = 0;
				}

				gy += 4*div(g_day_no,1461); /* 1461 = 365*4 + 4/4 */
				g_day_no = remainder (g_day_no, 1461);

				if (g_day_no >= 366) {
					leap = 0;

					g_day_no--;
					gy += div(g_day_no, 365);
					g_day_no = remainder (g_day_no, 365);
				}

				for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++)
					g_day_no -= g_days_in_month[i] + (i == 1 && leap);
				gm = i+1;
				gd = g_day_no+1;

				return new Array(gy, gm, gd);
			}

			function jalali_today() {
				Today = new Date();
				j = gregorian_to_jalali(new Array(
						Today.getFullYear(),
						Today.getMonth()+1,
						Today.getDate()
				));
				return j[2]+"/"+j[1]+"/"+j[0];
			}

			var main = {
				/**
				 * Convert a given Jalali date string to Latin date string. If param is an array returned
				 * value is also an array otherwise return value will be a string.
				 */
				toGregorian: function(date) {
					// If parameter is an array already convert an return an array
					if (General.isArray(date)) {
						return jalali_to_gregorian(date);
					}

					// Otherwise split it and ...
					var param = date.split(generalDelimiter);
					if (param.length == 3) {
						// ... join it with default delimiter and spit it out
						return jalali_to_gregorian(param).join(generalDelimiter);
					}
				},

				/**
				 * Convert a given Jalali date string to Latin date string. If param is an array returned
				 * value is also an array otherwise return value will be a string.
				 */
				toJalali: function(date) {
					// If parameter is an array already convert an return an array
					if (General.isArray(date)) {
						return gregorian_to_jalali(date);
					}

					// Otherwise split it and ...
					var param = date.split(generalDelimiter);
					if (param.length == 3) {
						// ... join it with default delimiter and spit it out
						return gregorian_to_jalali(param).join(generalDelimiter);
					}
				},

				/**
				 * Convert given timestamp to Jalali date
				 */
				timestampToJalali: function(timestamp) {
					if (!isTimestamp(timestamp)) {
						return false;
					}

					var d = new Date(timestamp);
					return gregorian_to_jalali([d.getFullYear(), d.getMonth() + 1, d.getDate()]);
				},

				/**
				 * Returns true if dateString looks like a Jalali date, false otherwise
				 */
				isDateStringJalali: function(dateString) {
					var parts = dateString.split(getDateDelimiter(dateString));
					if (parseInt(toLatinDigits(parts[0])) < 1900 && parts.length == 3) {
						return true;
					}
					return false;
				}
			};

			return main;
		}());

		var PersianSuperClass = {
			Numeral: Numeral,
			Date: Date
		};

		return PersianSuperClass;
	}());

	/**
	 * jQuery helper methods
	 */
	var jQuery = (function() {
		// Internal jQuery reference
		var $ = undefined;


		var main = {
			/**
			 * This method runs before any other reference
			 */
			init: function() {
				if ($ == undefined) {
					if (window.$ == undefined || window.jQuery == undefined) {
						throw new DOMException('jQuery cannot be found');
					} else {
						if (window.jQuery !== undefined) {
							$ = window.jQuery;
						}
					}
				}
			},

			/**
			 * Make given fn first to fire in name event queue
			 */
			bindFirst: function(name, fn) {
				this.init();

				$.fn.bindFirst = function(name, fn) {
					this.bind(name, fn);

					if (this.data('events') === undefined) {
						return;
					}
					var handlers = this.data('events')[name.split('.')[0]];
					var handler = handlers.pop();
					handlers.splice(0, 0, handler);
				};
			},
		};

		return main;
	}());

	var libjs = {
		/**
		 * Get current version of library
		 * @returns {number}
		 */
		getVersion: function() {
			return version;
		}
	};

	libjs.Persian = Persian;
	libjs.General = General;
	libjs.jQuery = jQuery;

	return libjs;
}());