var http = require('http');
var nodegrass = require('nodegrass');
var http_get=function(url,cb) {
    http.get(url, function(res) {
            var size = 0;
            var chunks = [];
            res.on('data',function(chunk){ size += chunk.length;chunks.push(chunk); });
            res.on('end', function() { var data=Buffer.concat(chunks, size);  cb(data.toString()); });
        }
    ).on('error', function(e) { console.log("Got error: " + e.message); });
};
var nodegrass_get=function(url,charset,cb){
    nodegrass.get(url,function(data,status,headers){
        cb(data,status,headers);
    },null,charset).on('error', function(e) { console.log("Got error: " + e.message); });
};
var get=function(url,cb){
    var charset={
        utf8:'text/html; charset=utf-8',
        gbk:'text/html; charset=utf-8',
        gb2312:'text/html; charset=gb2312'
    };
    nodegrass.get(url,function(data,status,headers){
        var type=headers['content-type'].toLowerCase();
        if(type==charset.utf8) cb(data,status,headers);
        else if(type==charset.gbk||charset.gb2312){
            nodegrass_get(url,'gbk',function(data,status,headers){ cb(data,status,headers) })
        }
    },null,'utf-8').on('error', function(e) { console.log("Got error: " + e.message); });
};
exports.get=get;