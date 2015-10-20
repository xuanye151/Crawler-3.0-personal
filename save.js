var request = require('request')
    url = require('url')
    string=require('./string')
    fs = require('fs')
    find=require('./parse').find
    get=require('./get').get

var img=function(url,name,path){
    var suffix=string.suffix(url);
    if(!path) path='../save/'
    request(url).pipe(fs.createWriteStream(path+name+'.'+suffix));
};
var page_img=function(web,src){
    if(!src) src=['src'];
    get(web,function(html){
        find(html,['title'],['text'],function(title,i){
            find(html,['img'],src,function(data,i){
                for(var j in data) {
                    if(!validator.isURL(data[j])) data[j]='http://'+url.parse(web).host+data[j];
                    //console.log(data[j]);
                    img(data[j],string.del_filename(title.text)+i);
                }
            })
        })
    })
};

exports.img=img;
exports.page_img=page_img;