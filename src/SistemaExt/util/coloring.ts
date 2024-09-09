class Color {
    public static Reset = "\x1b[0m"
    public static Bright: "\x1b[1m"
    public static Dim = "\x1b[2m"
    public static Underscore = "\x1b[4m"
    public static Blink = "\x1b[5m"
    public static Reverse = "\x1b[7m"
    public static Hidden = "\x1b[8m"

    public static FgBlack = "\x1b[30m"
    public static FgRed = "\x1b[31m"
    public static FgGreen = "\x1b[32m"
    public static FgYellow = "\x1b[33m"
    public static FgBlue = "\x1b[34m"
    public static FgMagenta = "\x1b[35m"
    public static FgCyan = "\x1b[36m"
    public static FgWhite = "\x1b[37m"
    public static FgGray = "\x1b[90m"

    public static BgBlack = "\x1b[40m"
    public static BgRed = "\x1b[41m"
    public static BgGreen = "\x1b[42m"
    public static BgYellow = "\x1b[43m"
    public static BgBlue = "\x1b[44m"
    public static BgMagenta = "\x1b[45m"
    public static BgCyan = "\x1b[46m"
    public static BgWhite = "\x1b[47m"
    public static BgGray = "\x1b[100m"

    public static colors = [
        Color.FgGreen, // 0
        Color.FgYellow, // 1
        Color.FgBlue, // 2
        Color.FgMagenta, // 3
        Color.FgCyan, // 4
    ]

    public static colorString(color:string, msg:string) {
        return `${color}${msg}${Color.Reset}`;
    }
      
    public static colorLog(color:string, ...args:any) {
        //return
        console.log(...args.map(
            (it:string) => typeof it === "string" ? Color.colorString(color, it) : it
        ));
    }

    static random():string {
        const random = parseInt(String(Math.random() * Color.colors.length))
        return Color.colors[random % Color.colors.length]
    }

    static index(i:number):string {
        return Color.colors[i % Color.colors.length]
    }

}

export default Color