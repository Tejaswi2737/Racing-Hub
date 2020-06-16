import moment from 'moment';
import countdownLib from 'countdown';

const timer =(time)=> {
        var ts = countdownLib(new Date.now());
        console.log(time)
        var formatted = '';
        if (ts.months > 1) {
            formatted = ts.months + ' months';
        } else if (ts.days === 0) {
            if (ts.hours === 0) {
                if (ts.minutes < 5) {
                    formatted = ts.minutes + 'm ' + ts.seconds + 's';
                } else {
                    formatted = ts.minutes + 'm ';
                }
            } else {
                formatted = ts.hours + 'h ' + ts.minutes + 'm';
            }
        } else {
            formatted = ts.days + 'd ' + ts.hours + 'h';
        }

        if (moment(time) < moment()) {
            formatted = '-' + formatted;
        }

        return formatted;
    }


export default timer;

// WEBPACK FOOTER //
// ./src/legacy/core/format.js
