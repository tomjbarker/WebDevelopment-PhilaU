var http = require("http");
var url = require("url");

/*
handle functions as a look up table
it stores functions to invoke
the path name is the string index
when a path is requested the route function uses that path to invoke the function stored at that index
*/

var handle = {}
handle["/"] = writeResponse;
handle["/favicon.ico"] = favicon;

/*
our server function, we pass in the functionality
to pull out the pathname and pass it to the route function
*/

var serv = http.createServer(function (req, res) {
	console.log("request received:\n" + JSON.stringify(req.headers) + "\n \n")
    var pathname = url.parse(req.url).pathname;
	console.log("routing path ...")
	route(pathname, res, req);
});


/*
route takes the pathname and invokes the associated function stored in handle 
*/

function route(path, res, req){
	console.log("routing " + path)
	handle[path](res, req);
}


/*
writes the hard coded HTTP response, sets the status code, content type and populates the response body
*/

function writeResponse(res, req) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<p>hello</p><h1>header</h1>");	
	res.end();
	console.log("response sent:\n" + JSON.stringify(res)  + "\n \n")
	
}


function favicon(res, req){
	res.writeHead(200, {
'Content-Type': 'image/x-icon'
} );
	res.end();
}

/*
sits and listens at port 3000
*/

serv.listen(3000);