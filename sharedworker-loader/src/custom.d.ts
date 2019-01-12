declare module "sharedworker-loader*" {
    class WebpackSharedWorker extends SharedWorker {
        constructor();
    }

    export = WebpackSharedWorker;
}
