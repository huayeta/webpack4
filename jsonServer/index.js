const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname,'./db.json'));
const routes = require(path.join(__dirname,'./routes.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/create/order',(req,res)=>{
    res.jsonp({id:1});
})

server.use(jsonServer.rewriter(routes))
server.use(router);
server.listen(3000,()=>{
    console.log('json server is runing,port 3000');
})
