var express = require('express')
var redis = require("redis")
var app = express()
const os = require('os')
const port = 3000
const version = (process.env.VERSION == undefined ? "V1" : process.env.VERSION )
let client = null;

let cont = 0;

app.get('/health', function (req, res){
    res.json({status: 'UP'})
})

app.get('/api', function(request, response) {
    response.send(`Hello ${version} from "${os.hostname}": ${++cont}`)
    console.log(`Request ${cont} received`)
})

app.get('/add/:name', function(request, response) {
    let msg = ''
    if (client == null){
        msg = 'REDIS_HOST not configured'
    }else{
        let name = request.params.name
        msg = `${name} added to Redis`
        client.set(name, name, redis.print)
    }
    response.send(msg)
    console.log(msg)
})

app.get('/get', function(request, response) {
    if (client == null){
        msg = 'REDIS_HOST not configured'
        response.send(msg)
    }else{
        client.keys('*', function (err, keys) {
            if (err) return console.log(err);
            response.send(keys)
        })
    }
})


app.listen(port, () => console.log(`Demo app listening on port ${port}!`))
if (process.env.REDIS_HOST != undefined){
    client = redis.createClient({
        retry_unfulfilled_commands: true,
        no_ready_check: true,
        connect_timeout: 1000 * 5, 
        host: process.env.REDIS_HOST})
}