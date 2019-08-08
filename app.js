const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { db } = require('./models');
const models = require('./models');
const layout = require('./views/layout');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

//-----------------------

// authenticate database is connected
db.authenticate().
then(() => {
  console.log('connected to the database');
})

// morgan, express.static, urlencoded, wikiRouter
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// homepage
app.get('/', (req, res) => {
  console.log('hello World');
  res.send(layout());
})

//--------- port
const PORT = 1337;

// model/table sync
const init = async () => {
  // await models.User.sync()
  // await models.Page.sync()
  await models.db.sync({force: true})

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
}

init();

