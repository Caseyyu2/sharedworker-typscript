
# Introducing Sharedworker-Loader

## Getting Started

To begin, you'll need to install `sharedworker-loader`
$ npm install --save-dev sharedworker-loader@2.1.1

## Modify Webpack Config
With the sharedworker-loader plug-in, you don't have to add code split config in webpack to split your worker script separately.
If you are also using typescript, the only rules you needed to add are
```
module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'sharedworker-loader' }
            }
            
        ]
}
```

## Using Loader
So how the script gets split out without code spliting?

The magic lays in the require statement

`import SharedWorker = require("sharedworker-loader?name=worker.js!./worker/mainworker");`


The require statement contains 3 parts: loader + script bundled name + entry point.

* loader: see if sharedworker-loader dependency is added
* script bundled name: the name of the bundled worker script
* entry point: the entry point for worker.

## Adding a typing file for your loader
Similar what worker-loader mentioned in their readme, you need to add a custom.d.ts for typescript to resolve the type of the imported worker module.
In order to do you'll need to
* npm install --save-dev @types/sharedworker
* create a typing definition for the module you imported
```
declare module "sharedworker-loader*" {
    class WebpackSharedWorker extends SharedWorker {
        constructor();
    }

    export = WebpackSharedWorker;
}
```

Voilà, when do npm run build, you'll see the worker script get splited out separately.

# Notes:
Some of you might have come across this PR 
https://github.com/webpack-contrib/worker-loader/pull/98/files. The change about creating sharedworker actually only merged into their feature branch feat-mode
So that's a no go for me.



