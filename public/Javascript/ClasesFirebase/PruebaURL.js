class URLGetter {
    constructor(url){
        this.url = url;

        this.obtenerParametros = function (url)
        {
            var loc = url;
            if(loc.indexOf('?')>0)
                {
                var getString = loc.split('?')[1];
                var GET = getString.split('&');
                var get = {};
                    for(var i = 0, l = GET.length; i < l; i++){
                        var tmp = GET[i].split('=');
                        get[tmp[0]] = unescape(decodeURI(tmp[1]));
                        }
                return get;
                }
            };
    }
}

module.exports = URLGetter;