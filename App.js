require('dotenv').config(); 

const Express = require('express'); 

const app = Express(); 

const database = require('./Db'); 

database.sync({ alter: true }); 

app.use(Express.json()); 

app.use(require('./middleware/headers')); 

app.use(Express.static(__dirname + '/public')); 

app.get('/', (req, res) => res.render('index')); 

const user = require('./controllers/usercontroller'); 
app.use('/user', user); 

const brawl = require('./controllers/brawlcontroller'); 
app.use('/brawl', brawl); 

const business = require('./controllers/businesscontroller'); 
app.use('/business', business); 

const vote = require('./controllers/votecontroller'); 
app.use('/vote', vote); 

app.listen(process.env.PORT, function(){console.log(`app is listening on port ${process.env.PORT}`)})