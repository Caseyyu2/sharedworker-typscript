import {AlertPrinter, Printer} from "./printer";
import {PromptReader, Reader} from "./reader";
import MySharedWorker = require("sharedworker-loader?name=worker.js!./worker/mainworker");

class IOManager {
    constructor(private reader: Reader, private printer: Printer) {
    }

    performIO() {
        let worker = new MySharedWorker();
        let message = this.reader.read();
        worker.port.onmessage = (ev: MessageEvent) => {
            this.printer.print(ev.data);
        };
        
        worker.port.postMessage(message);
    }
}

const magicIO = new IOManager(new PromptReader(), new AlertPrinter());
export = magicIO;
