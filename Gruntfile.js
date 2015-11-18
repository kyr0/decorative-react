module.exports = function(grunt) {

    grunt.initConfig({

        webpack: {
            app: {
                entry: "./src/index.js",
                output: {
                    path: '.',
                    filename: "index.js"
                },
                devtool: 'source-map',
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: "babel-loader"
                        }
                    ]
                },
                watch: true,
                keepalive: true,
                inline: true,
                failOnError: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('default', ['webpack']);
};