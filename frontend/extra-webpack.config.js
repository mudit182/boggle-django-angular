const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    plugins:[
        new BundleTracker({filename: '../webpack-stats-prod.json'})
    ],
    output: {
        path: require('path').resolve('./'),
        filename: "[name]-[hash].js",
    }
};
