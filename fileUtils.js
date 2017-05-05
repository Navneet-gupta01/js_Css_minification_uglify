/**
 * Created by navneetgupta on 05/05/17.
 */

'use strict';
const FILE_ENCODING = 'utf-8',
    EOL = '\n',
    fs = require('fs-extra'),
    uglyfyJS = require('uglify-js'),
    CleanCSS = require('clean-css'),
    chalk = require('chalk');

const fileUtils = {

    concatJS:function(obj){
        var fileList = obj.src,
            distPath = obj.dest,
            minify=obj.minify,
            out = fileList.map(function(filePath){
                console.log("filePath "+ filePath);
                var fileContent=fs.readFileSync(filePath).toString();
                if(minify){
                    fileContent = fileUtils.minifyJs({data:fileContent});
                }
                return fileContent + ';';
            });
        console.log(JSON.stringify(out));
        var finalData = out.join(EOL);
        distPath += '.js';
        fileUtils.writeFile(distPath,finalData);
        console.log(obj.filename+'- new file');
        return {
            'status' : true
        };
    },

    concatCSS:function(obj){
        var fileList = obj.src,
            distPath = obj.dest,
            minify=obj.minify,
            out = fileList.map(function(filePath){
                console.log("filePath "+ filePath);
                var fileContent=fs.readFileSync(filePath).toString();
                if(minify){
                    fileContent = fileUtils.minifyCSS({data:fileContent});
                }
                return fileContent;
            });
        console.log(JSON.stringify(out));
        var finalData = out.join(EOL);
        distPath += '.css';
        fileUtils.writeFile(distPath,finalData);
        console.log(obj.filename+'- new file');
        return {
            'status' : true
        };

    },

    writeFile:function(file,data){
        fs.createFileSync(file);
        fs.writeFileSync(file, data);
        console.log(chalk.green('Successfully Written file %s', file));
    },

    minifyJs:function(option){
        var srcPath=option.src;
        var distPath=option.dest;
        var data=option.data;
        var topLevel = null;
        var code = data;
        if(!code)
            code = fs.readFileSync(srcPath, FILE_ENCODING);
        topLevel = uglyfyJS.parse(code, {
            filename: srcPath,
            topLevel: topLevel
        });
        topLevel.figure_out_scope();
        //var options = {};
        var compressor = uglyfyJS.Compressor();
        var compressed_ast = compressor.compress(topLevel);
        compressed_ast.figure_out_scope();
        compressed_ast.compute_char_frequency();
        compressed_ast.mangle_names();
        var stream = uglyfyJS.OutputStream();
        compressed_ast.print(stream);
        //var code = stream.toString();
        //var jsp = uglyfyJS.parser; // js parser function
        //var pro = uglyfyJS.uglify;
        ////var options = {
        ////    filename: file,
        ////    toplevel: null
        ////};
        //var ast=data ? uglyfyJS.parse(data) : uglyfyJS.parse( fs.readFileSync(srcPath, FILE_ENCODING) );
        //var minfied;
        //
        //ast = pro.ast_mangle(ast);
        //ast = pro.ast_squeeze(ast);
        //minfied=pro.gen_code(ast);

        if(distPath){
            fileUtils.writeFile(distPath,stream.toString());
        }

        return stream.toString();
    },

    minifyCSS:function(option){
        var srcPath=option.src;
        var distPath=option.dest;
        var data=option.data;

        var minfied = new CleanCSS().minify(data).styles;

        if(distPath){
            fileUtils.writeFile(distPath,minfied);
        }
        return minfied;
    }
};

module.exports = fileUtils;