module.exports = function (api) {
    api.cache(true);

    const presets = [
        "@babel/preset-typescript",
        "@babel/preset-react",
        ["@babel/env", {
            "targets": {
                "node": "current",
                "browsers": ["last 2 versions"]
            }
        }]
    ];
    const plugins = [
        ["@babel/transform-runtime"]
    ]

    return {
        presets,
        plugins
    };
}