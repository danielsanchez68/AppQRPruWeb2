"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    static colorString(color, msg) {
        return `${color}${msg}${Color.Reset}`;
    }
    static colorLog(color, ...args) {
        //return
        console.log(...args.map((it) => typeof it === "string" ? Color.colorString(color, it) : it));
    }
    static random() {
        const random = parseInt(String(Math.random() * Color.colors.length));
        return Color.colors[random % Color.colors.length];
    }
    static index(i) {
        return Color.colors[i % Color.colors.length];
    }
}
Color.Reset = "\x1b[0m";
Color.Dim = "\x1b[2m";
Color.Underscore = "\x1b[4m";
Color.Blink = "\x1b[5m";
Color.Reverse = "\x1b[7m";
Color.Hidden = "\x1b[8m";
Color.FgBlack = "\x1b[30m";
Color.FgRed = "\x1b[31m";
Color.FgGreen = "\x1b[32m";
Color.FgYellow = "\x1b[33m";
Color.FgBlue = "\x1b[34m";
Color.FgMagenta = "\x1b[35m";
Color.FgCyan = "\x1b[36m";
Color.FgWhite = "\x1b[37m";
Color.FgGray = "\x1b[90m";
Color.BgBlack = "\x1b[40m";
Color.BgRed = "\x1b[41m";
Color.BgGreen = "\x1b[42m";
Color.BgYellow = "\x1b[43m";
Color.BgBlue = "\x1b[44m";
Color.BgMagenta = "\x1b[45m";
Color.BgCyan = "\x1b[46m";
Color.BgWhite = "\x1b[47m";
Color.BgGray = "\x1b[100m";
Color.colors = [
    Color.FgGreen, // 0
    Color.FgYellow, // 1
    Color.FgBlue, // 2
    Color.FgMagenta, // 3
    Color.FgCyan, // 4
];
exports.default = Color;
