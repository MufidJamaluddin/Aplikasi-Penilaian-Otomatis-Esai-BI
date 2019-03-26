var ncp = require("ncp");

ncp("build/static","../ujian_app/static", callback);

ncp("build/index.html", "../ujian_app/static/index.html", callback);

ncp("build/asset-manifest.json","../ujian_app/static/asset-manifest.json", callback);

ncp("build/favicon.ico","../ujian_app/static/favicon.ico", callback);

ncp("build/service-worker.js","../ujian_app/static/service-worker.js", callback);

function callback(){

} 