var express = require('express');
var session = require('express-session');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Client_ID= '48756961857-40tf8c8dqmoijjat7fkkht0j0msrs61c.apps.googleusercontent.com';
const Client_Secret= '0mnYBlzlUhZ84z4DkRd5PQDC';


const app = express();
app.use(session({
    secret:'googleAuth', saveUninitialized:true, resave:true
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');




const port = process.env.PORT || 3500;

app.get('/', (req,res)=>{
    res.render('../pages/auth');
})

app.get('/error',(req,res)=>{
    res.send('error in login with gmail')
})

app.get('/success', (req,res)=>{
    res.send('successfully login');
})

passport.serializeUser(function(user,cb){
    cb(null,user);
})

passport.deserializeUser(function(obj,cb){
    cb(null,obj);
})


passport.use(new GoogleStrategy({
    clientID:Client_ID,
    clientSecret:Client_Secret,
    callbackURL:"http://localhost:3500/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    var useprofile = profile;
    return done(null, useprofile);
}

));
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/error'}),
function(req,res){
    res.redirect('/success');
})


app.listen(port,()=>{
    console.log
})





