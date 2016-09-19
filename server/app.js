var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var todos = [{id: 1, title: '买飞机', completed: true},
    {id: 2, title: '买坦克', completed: false}];
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PUT,POST');
    if (req.method == 'OPTIONS')
        res.end();
    else
        next();
});

app.route('/todos').get(function (req, res) {
    res.send(todos);
}).post(function (req, res) {
    var todo = req.body;
    if(todos.length>0)
       todo.id = todos[todos.length-1].id + 1;
    else
        todo.id = 1;
    todos.push(todo);
    res.send(todo);
}).delete(function(req,res){
    todos = todos.filter(function(item){
        return !item.completed;
    });
    res.send({});
});

app.route('/todos/:id').delete(function (req, res) {
    var id = req.params.id;
    todos = todos.filter(function(item){
        return item.id != id;
    });
    res.send({});
}).put(function(req,res){
    var todo = req.body;
    todos = todos.map(function(item){
        if(item.id == req.params.id)
            return todo;
        else
        return item;
    });
    res.send(todo);
})

app.listen(8080);