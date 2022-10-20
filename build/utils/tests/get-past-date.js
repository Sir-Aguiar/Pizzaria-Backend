"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastDate = void 0;
const date_fns_1 = require("date-fns");
function getPastDate(date) {
    return (0, date_fns_1.setYear)((0, date_fns_1.parseISO)(date), new Date().getFullYear() - 1);
}
exports.getPastDate = getPastDate;
