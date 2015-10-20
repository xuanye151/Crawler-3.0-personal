var cheerio = require('cheerio');
var escaper=require('true-html-escape');
var find=function(data,tag,options,cb){
    var $ = cheerio.load(data);
    var output=[];
    if(typeof tag=='object'&&typeof options=='object'&&tag[0]) {
        $(tag[0]).each(function(n, e){
            if(!tag[1]) {
                for(var i=0;i<options.length;i++) {
                    var order=options[i];
                    if(order=='text')       output[order]=$(e).text();
                    else if(order=='html') output[order]=escaper.unescape($(e).html());
                    else                    output[order]=$(e).attr(order);
                }
                cb(output,n);
            }
            else $(e).children(tag[1]).each(function(n,e){
                if(!tag[2]) {
                    for(var i=0;i<options.length;i++) {
                        var order=options[i];
                        if(order=='text')       output[order]=$(e).text();
                        else if(order=='html') output[order]=escaper.unescape($(e).html());
                        else                    output[order]=$(e).attr(order);
                    }
                    cb(output,n);
                }
                else $(e).children(tag[2]).each(function(n,e){
                    if(!tag[3]){
                        for(var i=0;i<options.length;i++) {
                            var order=options[i];
                            if(order=='text')       output[order]=$(e).text();
                            else if(order=='html') output[order]=escaper.unescape($(e).html());
                            else                    output[order]=$(e).attr(order);
                        }
                        cb(output,n);
                    }
                })
            })
        });
    }
};
exports.find=find;