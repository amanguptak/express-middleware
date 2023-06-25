const express = require('express');
const bodyParser = require('body-parser');
const app= express();

app.use(bodyParser.urlencoded({extended:false}))
app.set('views',__dirname + '/public/views');
app.set('view engine', 'pug');

const emailValidate= (emailAdress)=>{
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailAdress.match(regexEmail)){
        return true;
    } else{
        return false;
    }
}

const passwordValidate= (password)=>{
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(password.match(decimal)){
        return true;
    }
    else{
        return false;
    }


}
const checkValidity=(req,res,next)=>{
    let login = {email:req.query.email, password:req.query.password}
    if(req.query.email!=null && req.query.password!=null){
        if(emailValidate(req.query.email) && passwordValidate(req.query.password)){
            res.render("login",login);
            
        }else{
            res.send("Wrong Credential");
        }
        
    }
    next();
}

app.use(checkValidity);
app.get('/',(req, res) => {

    res.render('index')

});

app.listen(8000,()=>{
    console.log("server is running on port 8000");
})