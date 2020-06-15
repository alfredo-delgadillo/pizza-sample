const http = require('http')
    , express = require('express')
    //, morgan = require('morgan')
    , app = express();

//config
const port = 3000;

//app.use(morgan('dev'));
const bodyParser = require("body-parser");

//set response type
app.use(bodyParser.json());
//make sure the rest url is enconded
app.use(bodyParser.urlencoded({ extended: true}));

//router
const router = express.Router();
app.use(router);

//Main Address
router.get("/", (req, res, next) => {
    res.status(200)
        .send("Hello world");
  });

router.use((err, req, res, next) => {
    if (err){
        //Handle Errors
        return res.sendStatus(500);
    }
});

//routes
//register all controllers
var controllersPath = require("path").join(__dirname, "controllers");
require("fs").readdirSync(controllersPath).forEach(function(file) {
    app.use('/api/', require("./controllers/" + file));
});

app.get('*', (req,res) => {
    res.sendStatus(404);        // HTTP status 404: NotFound
});

//start app on port
app.listen(port, err =>{
    if (err){
        console.log(`Cannot listen on port: ${port}`);
    }
    console.log(`Server started on port: ${port}`);
});