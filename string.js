var  validator=require('validator');

var contain=function(data,seeds,type){
    var counter=0;
    if(typeof seeds=='object') var num=seeds.length;
    for(var i=0;i<num;i++) if(validator.contains(data,seeds[i])) counter++;
    if(!type||type=='all') {
        if(counter==num) return true;
        else return false;
    }
    else if(type=='one'){
        if(counter>=1) return true;
        else return false;
    }
};
var suffix=function(str){
    var a=str.lastIndexOf('.');
    return str.substring(a+1);
};
var del=function(input,delete_aim){
    if(typeof delete_aim=='object'){
        for(var i in delete_aim) input=validator.blacklist(input,delete_aim[i]);
        return input;
    }
};
var del_filename=function(input){return del(input,['|','/','?','<','>',':','*','"'])};

exports.contain=contain;
exports.suffix=suffix;
exports.del=del;
exports.del_filename=del_filename;
