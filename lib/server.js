var exp = require('express')
  , app = exp()
  , bp  = require('body-parser')
  , cors = require('cors')
  , headers = { "Content-Type" : "application/json" }
  , _lastById = {}
  , ID = 1000
  ;

app.use(cors({credentials: true, origin: true})); //add CORS support
app.use(bp.json({strict: false}));
app.use(function(req,res,next) { 
    console.log(req.method + " " + req.url , req.body || "no body");
    next();
})

app.get("/next", function(req, res) { 
    res.writeHead(200, headers);
    res.end( JSON.stringify({ id:++ID }) );
})

app.post("/id/:id", function(req, res) {
    if (!req.body || !req.body.msg ) {
        res.writeHead(400, headers);
        res.end( JSON.stringify( { status: 'no messages found' } ) );
        return;
    }

    var last = lastById( req.params.id );

    last.push( req.body );

    res.writeHead(200, headers);
    res.end( JSON.stringify( { status: 'ok', accepted: req.body.msg.length }));
});


app.get("/last-of/:id", function(req,res) { 
    var last = lastById( req.params.id );
    
    res.writeHead(200, headers);
    res.end( JSON.stringify( { id : req.params.id , last: last } ) );
});

module.exports = app;

function lastById(id) {
     return lastById[ id ] || (lastById[ id ] = []);
}