"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = require("./Vehicle");
class Car extends Vehicle_1.default {
    constructor(obj) {
        super(obj);
        this.doorsQty = obj.doorsQty;
        this.seatsQty = obj.seatsQty;
    }
}
exports.default = Car;
