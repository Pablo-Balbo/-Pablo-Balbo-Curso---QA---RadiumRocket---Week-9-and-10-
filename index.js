const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const newUsers = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello world!')
});

app.listen(port, () => {
  console.log(`Server initializated at port: ${port}`)
});

var handleRegister = function(req, res){
  console.log(req.body);
  const newUser = {
    name: req.body.fullName,
    email: req.body.email,
    pass: req.body.password
  };
  if(!newUser.name || !newUser.email || !newUser.pass){
    return res.status(400).json({ msg: 'Please, enter a name, email and a password'});          
  } else {
    newUsers.push(newUser);
    return res.json({result: 'Success!'});
  }
};

var handleLogin = function(req, res){
  console.log(req.body);
  const registeredUser = {
    email: req.body.email,
    pass: req.body.password
  };
  for (let i = 0; i < newUsers.length; i++) {
    if(newUsers[i].email === registeredUser.email){
      if(newUsers[i].pass === registeredUser.pass){
        return res.json({result: 'Successfull!'});
      } else {
        return res.status(400).json({msg: 'Password do not match'});
      }
    }
  }
  return res.status(400).json({msg: 'User does not exist'});
};

app.post('/register', handleRegister);

app.put('/login', handleLogin);