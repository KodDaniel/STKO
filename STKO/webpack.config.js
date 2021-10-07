const path = require("path");
//var webpack = require("webpack");

module.exports = {
    entry: {
        userMessage: "./wwwroot/scripts/ts/userMessage.ts",
        formClientValidation: "./wwwroot/scripts/ts/formClientValidation.ts", 
        createOrUpdateExam: "./wwwroot/scripts/ts/createOrUpdateExam.ts",
        sharedTypes: "./wwwroot/scripts/ts/sharedTypes.ts",
        displayExam: "./wwwroot/scripts/ts/displayExam.ts",
        listExams: "./wwwroot/scripts/ts/listExams.ts",
        sortExamTableRows: "./wwwroot/scripts/ts/sortExamTableRows.ts",
        sortTableRows: "./wwwroot/scripts/ts/sortTableRows.ts",
        sortTuples: "./wwwroot/scripts/ts/sortTuples.ts"
    }, 
    resolve: {
        extensions: [".ts"]
    }, 
    //devtool: false,
    //plugins: [
    //    new webpack.SourceMapDevToolPlugin({
    //        filename: "[file].map",
    //        fallbackModuleFilenameTemplate: "[absolute-resource-path]",
    //        moduleFilenameTemplate: "[absolute-resource-path]"
    //    })
    //],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    output: {
        // The format for the outputted files
        filename: "[name].js",
        // Put the files in "wwwroot/js/"
        path: path.resolve(__dirname, "wwwroot/scripts/js")
    }
};