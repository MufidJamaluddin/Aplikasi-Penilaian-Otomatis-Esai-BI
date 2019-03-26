var ncp = require("ncp");
var path = require("path");
var fs = require("fs");

const dir_path = path.join(__dirname, 'build');

/**
 * Copy File Hasil Build Reactjs
 * ke Proyek Python 
 */
function copy_file()
{
    console.log('Copy File CSS, JS, IMG, dan Media ke "ujian_app/static"');    
    ncp("build/static","../ujian_app/static", callback);

    fs.readdir(dir_path, function(err, files){
        if(err)
        {
            console.error(err);
            console.log('Gagal Copy File!');
        }
        else
        {
            files.forEach(function(file)
            {
                if(file !== 'static')
                {
                    console.log('Copy File ' + file + ' ke "ujian_app/static"');
                    ncp('build/' + file, '../ujian_app/static/' + file, callback);
                }
            });
        }
    });
}

function callback(error)
{
    if(error) 
    {
        console.log(error);
        console.log('GAGAL Copy File ke "ujian_app/static"!');
    }
} 

copy_file();