"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNombre = void 0;
const faker_1 = require("@faker-js/faker");
const getNombre = () => {
    var _a, _b;
    let nombre = (_b = (_a = faker_1.fakerES.person.fullName().split(' ')) === null || _a === void 0 ? void 0 : _a.splice(0, 2)) === null || _b === void 0 ? void 0 : _b.join(' ');
    return nombre.slice(0, 12);
};
exports.getNombre = getNombre;
//console.log(getNombre())
