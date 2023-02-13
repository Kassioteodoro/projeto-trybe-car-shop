"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehicle {
    constructor(obj) {
        this.id = obj.id;
        this.model = obj.model;
        this.year = obj.year;
        this.color = obj.color;
        this.status = obj.status || false;
        this.buyValue = obj.buyValue;
    }
}
exports.default = Vehicle;
