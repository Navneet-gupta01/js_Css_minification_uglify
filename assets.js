/**
 * Created by navneetgupta on 05/05/17.
 */

var assets = {
    client: {
        js: {
            base: {
                finalName: 'base.min',
                files: [
                    'public/js/lib/jquery-3.1.1.js',
                    'public/js/libcore/*.js',
                    'public/js/lib/!(jquery-3.1.1).js'
                ]
            },
            spa: {
               finalName: 'core.min',
               files:[
                   'public/js/spa/**.js',
               ]
            }
        },
        css: {
            base : {
               finalName: 'base.min',
               files: [
                   'public/css/lib/*.css'
               ]
            },
            spa : {
               finalName: 'spa.min',
               files: [
                   'public/css/spa/*.css'
               ]
            }
        }
    }
};

module.exports = assets;