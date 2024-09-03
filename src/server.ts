import { inject, injectable } from "inversify"
import { IUI } from "./in/Puertos/IUI"
import TYPES from "./container.types"
import { IServer } from "./IServer"

@injectable()
class Server implements IServer {
    constructor(@inject(TYPES.IUI) private ui: IUI) {}

    start() {
        this.ui.start()
    }
}

export default Server