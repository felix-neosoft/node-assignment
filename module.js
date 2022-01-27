module.exports = {
    postConvertJson: function(data){
        var params = data.split("&")
        var obj = {}
        for(var i in params){
            var keys = params[i].split("=")
            obj[keys[0]] = keys[1];
        }
        return obj
    }
}