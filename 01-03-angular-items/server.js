var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));

var names_id=3;
var names=[{ _id: 0, name: 'Kelda', age:32},
           { _id: 1, name: 'Richard', age: 33},
           { _id: 2, name: 'Quinten', age: 32},
];

var bp = require('body-parser');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get('/names',function(req,res){
  res.json(names);
});
app.get('/names/:id', function(req,res){
  res.json(names.find(function(element){
    return element._id === parseInt(req.params.id)
  }));
});
app.post('/names',function(req,res){
  var newUser=req.body;
  if (newUser.name && newUser.age){
    newUser._id = names_id;
    names_id++;
    names.push(newUser);
    res.json(newUser);
  }
  else{
    res.status(500).json("Name and Age are required.")
  }
});
app.post('/names/:id',function(req,res){
  console.log('update',req.body)
  var user = names.find(function(element){
    return element._id === parseInt(req.params.id)
  });
  var idx=names.indexOf(user);
  if (idx !== -1){
    names[idx]=req.body;
    res.json({'success': true, '_id': parseInt(req.params.id)})
  }
  else {
    res.status(500).json(`Curiously, _id: ${req.params.id} not found for update.`)
  }

});
app.post('/names/:id/destroy',function(req,res){
  console.log("destroy", req.body)
  var user = names.find(function(element){
    return element._id === parseInt(req.params.id)
  });
  var idx=names.indexOf(user);
  if (idx !== -1){
    names.splice(idx,1);
    res.json({'deleted': true, '_id': parseInt(req.params.id)})
  }
  else{
    res.status(500).json(`Curiously, _id: ${req.params.id} not found for deletion.`)
  }
})

app.listen(8000);
