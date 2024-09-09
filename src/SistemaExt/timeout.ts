import Color from "./util/coloring"


class TimeOut {
    private imeisLive:any

    constructor() {
        this.imeisLive = {}
        setInterval(() => {
            Object.keys(this.imeisLive).forEach(imei => {
                if((Date.now() - this.imeisLive[imei].to) > 5000) {
                    console.log(
                        Color.colorString(Color.BgRed,'TimeOut'), 
                        Color.colorString(this.getColorImei(imei), `imei[${imei}]`)
                    )
                    delete this.imeisLive[imei]
                }
            })
        },1000)
    }

    setLive = (imei:string) => {
        if(!Object.keys(this.imeisLive).includes(imei)) {
            this.imeisLive[imei] = {}
            this.imeisLive[imei].color = Color.index(+imei % Color.colors.length) // Color.random()
            this.imeisLive[imei].sendLogin = true
        }
        this.imeisLive[imei].to = Date.now()
    }
    getLives = () => this.imeisLive
    getColorImei = (imei:string) => this.imeisLive[imei].color || Color.FgWhite
    getSendLogin = (imei:string) => this.imeisLive[imei].sendLogin || false
    resetSendLogin = (imei:string) => this.imeisLive[imei].sendLogin = false
}

export default TimeOut

