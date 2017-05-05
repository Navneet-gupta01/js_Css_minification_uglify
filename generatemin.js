/**
 * Created by navneetgupta on 05/05/17.
 */
"use strict";

const assets = require('./assets'),
    config = require('./config'),
    fu = require('./fileUtils'),
    build_object = {},
    PROD_PATH_JS = "./public/passets/js",
    PROD_PATH_CSS = "./public/passets/css";

//var fs = require('fs-extra');
//var config = require('./config');
//var fu = require('./helpers/fileUtils');
//var getAssets = require('./models/assets');
//var hbs = require('express-hbs');
//const env = config.environment;
//var MINIFY = false;
//var ASSET_DIR = "cdn.zivame.com";
//var BUILD_PATH_JS = "public/passets/js";
//var BUILD_PATH_CSS = "public/passets/css";
//var PROD_PATH_JS = "./public/passets/js";
//var PROD_PATH_CSS = "./public/passets/css";
//var DEV_PATH_JS = "./public/assets/js";
//var DEV_PATH_CSS = "./public/assets/css";
//var BUILD_NO_PATH = "./public/passets/build_no.txt";
//var build_object_path = './build_obj.txt';
//var secure_build_object_copy = './secure_build_copy.txt';
//var build_copy_path = './build_copy.txt';
//var build_delete_path = './build_del.txt';
//var build_object = {};
//var build_arr = [];
//var secure_build_arr = [];
//var del_arr = [];
//var EOL = ',';

var MINIFY = true;

var getActualPathsOfFile = function(files) {
    console.log("files " + JSON.stringify(files));
    if(files) {
        var allFiles = config.getGlobbedPaths(files);
        console.log("allFiles " + JSON.stringify(allFiles));
        return allFiles;
    } else {
        return [];
    }
};
var generatemin = function(arg,cb) {
    const css = arg.client.css,
        js = arg.client.js;


    for(var key in js){
        build_object[js[key].finalName]  = fu.concatJS({
            src: getActualPathsOfFile(js[key].files),
            dest: PROD_PATH_JS+'/'+js[key].finalName,
            filename :  js[key].finalName,
            minify: MINIFY
        });

        if(build_object[js[key].finalName].status){
            console.log(" Great Done For finalName = " + js[key].finalName);
        }
    }
    for(var key in css){
        build_object[css[key].finalName]  = fu.concatCSS({
            src: getActualPathsOfFile(css[key].files,'css'),
            dest: PROD_PATH_CSS+'/'+css[key].finalName,
            filename :  css[key].finalName,
            minify: MINIFY
        });

        if(build_object[css[key].finalName].status){
            console.log(" Great Done For finalName = " + css[key].finalName);
        }
    }

    cb();

};

generatemin(assets,function(){console.log("successful")});