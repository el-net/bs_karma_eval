window.Sender = (function() { 
    return { 
      get  : getXhr,
      post : postXhr
    };
    
    function getXhr(req) {
        req.body = undefined;
        req.method = 'GET';
        request(req);
    }

    function postXhr(req) {
        req.method = 'POST';
        request(req)
    }
    
    function request(req) {
        var xhr = createCORSRequest(req.method, req.url);
        xhr.onload = function () {
            var status = typeof xhr['status'] === 'undefined' ? 200 : xhr.status;
            if ('function' == typeof req.response) req.response(xhr.responseText);
            var h = req[ status == 200 ? "success" : "failure" ];
            if ('function' == typeof h) h(xhr.responseText);
            else if (!req.response) console.log('suppressed response from ' + req.url + ' status: ' + req.status );
        };
    
        xhr.onerror = function () {
            if ('function' == typeof req.failure) req.failure(xhr.responseText);
            else console.log('suppressed connection failure to : ' + req.url );
        };
        xhr.send(req.body);
    }
    
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
             
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-type", "application/json");
    
        } else if (typeof XDomainRequest !== "undefined") {
            // Otherwise, check if XDomainRequest. 
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);
            
        } else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        xhr.timeout = 15 * 1000; //15s
        return xhr;
    }        
})()
