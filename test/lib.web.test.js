var app = require('../lib/server')
  , request = require('request')
  ;
module.exports = 
{ "server" : 
  { "is cool" : 
    function() {
      Should.exist(app);
      app.should.be.a.Function;
      app.should.have.property('listen');
    }
  , "services" : 
    block(function() {
        var svr, id;
        
        return {   
          beforeAll : 
          function(done) {
              svr = app.listen(3333, done)
          }
        , afterAll: 
          function(done) {
              svr.close(done);
          }
        , "GET /next - returns an id"  :
          function(done) {
              request("http://localhost:3333/next", function(err, req, body) {
                  Should.not.exist(err);
                  req.should.have.property('statusCode', 200);

                  try { 
                      body = JSON.parse(body);
                  } catch( ex ) {
                      return done(ex);
                  }
                  
                  Should.exist(id = body.id);  
                  done()
              })
          }
        , "POST /id/:id - accepts post of messages" : 
          function(done) {
              request(
              { url     : "http://localhost:3333/id/" + id
              , method  : "POST"
              , json    : { msg: [1,2,3] } 
              } , function(err, req) {
                  Should.not.exist(err);
                  req.should.have.property('statusCode', 200);
                  
                  req.should.have.property('body', { status: 'ok', accepted: 3 } );
                  
                  revalidate(done)                   
              })
              
              function revalidate(done) {
                  request( "http://localhost:3333/last-of/" + id, function(err, req, body) {
                      body.should.eql('{"id":"'+id+'","last":[{"msg":[1,2,3]}]}')
                      done()
                  })
              }
          }
        }
    })
  }
}