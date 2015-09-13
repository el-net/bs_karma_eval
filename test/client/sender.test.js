describe("Sender", function() { 
  it("should be a module object" , function() { 
    expect(window.Sender).to.be.an(Object);
  });
  it("should have API post(objRequest)", function() { 
    expect(Sender).to.have.property('post');
    expect(Sender.post).to.be.a(Function);
  });
  
  context("using it", function() {
    var id;
    
    context("get request", function() {
      it("should not fail", function(done) {
        Sender.get(
          { url: "http://localhost:3333/next"
          , success: function(body) {
                try {
                    id = JSON.parse(body).id;
                }catch(ex) {
                  done(ex);
                }
                expect(id).to.be.ok();
                done();
            }
          }
        );   
      });
    });
    
    context("POST request", function() {
      it("should not fail", function(done) {
        Sender.post(
          { url: "http://localhost:3333/id/" + id
          , body: JSON.stringify({msg:[1,2,3]})
          , response: 
            function(confirmation) {
                expect(confirmation).to.eql('{"status":"ok","accepted":3}');
                Sender.get(
                  { url: "http://localhost:3333/last-of/" + id
                  , response: 
                    function() {
                    }
                  , success: 
                    function(last) {
                        expect(last).to.eql('{"id":"' + id + '","last":[{"msg":[1,2,3]}]}');
                        done()
                    }
                  }
                )
            } 
          }
        )
      });
    });
  });
});