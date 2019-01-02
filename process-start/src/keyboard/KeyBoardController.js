export class KeyBoardController {
    _INSTANT_OF_KBC = null

    listeners = new Map()

    constructor(document) {
        let that = this
        document.onkeydown = function (event) {
            event = event || window.event;
            if (that.listeners.has(event.which)) {
                let func = that.listeners.get(event.which)
                func(event)
            }
        }
    }

    bindListener(key, func) {
        this.listeners.set(key, func)
    }

    static bindListenerForDOC(document, func) {
        document.onkeydown = func
    }

    static getInstance(document) {
        if (this._INSTANT_OF_KBC === undefined) {
            this._INSTANT_OF_KBC = new KeyBoardController(document);
        }
        return this._INSTANT_OF_KBC;
    }
}