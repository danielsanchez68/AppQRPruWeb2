"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coloring_1 = __importDefault(require("./util/coloring"));
class TimeOut {
    constructor() {
        this.setLive = (imei) => {
            if (!Object.keys(this.imeisLive).includes(imei)) {
                this.imeisLive[imei] = {};
                this.imeisLive[imei].color = coloring_1.default.index(+imei % coloring_1.default.colors.length); // Color.random()
                this.imeisLive[imei].sendLogin = true;
            }
            this.imeisLive[imei].to = Date.now();
        };
        this.getLives = () => this.imeisLive;
        this.getColorImei = (imei) => this.imeisLive[imei].color || coloring_1.default.FgWhite;
        this.getSendLogin = (imei) => this.imeisLive[imei].sendLogin || false;
        this.resetSendLogin = (imei) => this.imeisLive[imei].sendLogin = false;
        this.imeisLive = {};
        setInterval(() => {
            Object.keys(this.imeisLive).forEach(imei => {
                if ((Date.now() - this.imeisLive[imei].to) > 5000) {
                    console.log(coloring_1.default.colorString(coloring_1.default.BgRed, 'TimeOut'), coloring_1.default.colorString(this.getColorImei(imei), `imei[${imei}]`));
                    delete this.imeisLive[imei];
                }
            });
        }, 1000);
    }
}
exports.default = TimeOut;
