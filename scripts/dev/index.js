import open from 'open';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);

const SRC = path.join(process.cwd(), 'src');

const devServerOptions = {
    contentBase: [
        SRC
    ],
    hot: true,
    historyApiFallback: true,
    stats: 'verbose',
};

const server = new WebpackDevServer(compiler, devServerOptions);
let opened = false;

const openBrowser = () => {
    const address = server.listeningApp.address();
    const url = `http://${address.address}:${address.port}`;
    console.log(`   server started: ${url}`);
    open(`${url}/originreduxwithreducer.html`);
};

compiler.plugin('done', () => {
    if (!opened) {
        opened = true;
        openBrowser();
    }
});

const startServer = new Promise((resolve, reject) => {
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});

const devServer = async() => {
    await startServer;

    const stdIn = process.stdin;
    stdIn.setEncoding('utf8');
    stdIn.on('data', openBrowser);
};

devServer().catch((ex) => {
    console.error(ex);
});

