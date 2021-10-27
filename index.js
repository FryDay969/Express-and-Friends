const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended:true}))

//-------Array for saving users-------//

let users = [];

//-------Route functions-------//
const getNewUser = (req,res ) => {
        if(req.url !== ('/user/new')){
            throw err
            res.send("Error")
        }else{
            req.body.id = uuidv4();
            users.push(req.body);
            res.send(users)
        }
}

const printUser = (req,res) => {
    if(req.url !== ('/users')) {
        throw err
        res.send("Error")
    }else{
            res.send(users)
    }
}

const userDelete = (req,res) =>{
    if(req.url.match('/user/id:')){
        let idFromUrl = req.url.replace('/user/id:', '');
        for (i=0; i<users.length; i++){
            if (idFromUrl === users[i].id){
                users.splice(i,1)
                res.send(users);
            }
        }
    }else{
        throw err
        res.send("Error")
    }

}

const userUpdate = (req,res) => {
    if(req.url.match('/user/id:')){
        let idFromUrl = req.url.replace('/user/id:', '');
        for (i=0; i<users.length; i++){
            if (idFromUrl === users[i].id){
                users[i].name = req.body.name;
                users[i].lastname = req.body.lastname;
                res.send(users[i]);
            }
        }
    }else{
        throw err
        res.send("Error")
    }

}

//-------Route request methods------//

app.get('/', (req,res) =>{
    res.send(200);
})

app.post('/user/new', getNewUser);

app.get('/users', printUser);

app.delete(/\/user\/id:(.*)/, userDelete);

app.patch(/\/user\/id:(.*)/, userUpdate);

//-------Server listening method-------//

app.listen(PORT, () =>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})


