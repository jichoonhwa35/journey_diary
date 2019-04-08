var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash");
    app.locals.moment = require("moment");
var passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    Diary  = require("./models/diary"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");
    // seedDB      = require("./seeds");

var commentRouts    = require("./routes/comments"),
    diaryRoutes = require("./routes/diaries"),
    authRoutes      = require("./routes/auth");
    
    
mongoose.connect("mongodb://localhost/journey_diary", {useCreateIndex: true, useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed the dataabase
//seedDB();

// Passport configuration
app.use(require("express-session")({
    secret:"only one in the world",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //comes form passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//every route will shows current user
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/",authRoutes);
app.use("/diaries",diaryRoutes);
app.use("/diaries/:id/comments",commentRouts);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});