const sharedWorkerGloabal: SharedWorker.SharedWorkerGlobalScope = self as any;
//bundling other node libraries
import { workerKid } from "./workerkid";
import randomcolor = require('randomcolor'); // import the script

let message = "";

sharedWorkerGloabal.onconnect = (e: MessageEvent) => {
    const port = e.ports[0];

    port.onmessage = (e: MessageEvent) => {
        message += e.data;
        //message += randomcolor();
        message += workerKid();
        message = message.replace(/fuck/gi, "tutu");
        port.postMessage(message);
    }
}
