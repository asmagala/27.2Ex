const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', (req, res) => {
  res.render('forbidden');
});

app.get('/', (req, res) => {
res.render('index');
});

app.get('/home/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: true, name: req.params.name });
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/contact', (req, res) => {
  res.render('contact', { sendvisibility: "none", errvisibility: "none"});
});

app.post('/contact/send-message', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    const { author, sender, title, message } = fields;
    const imgFile = files.imgFile.name;

    if (err) {
      console.error('Error', err)
      throw err
    }
    
    if(author && sender && title && message && imgFile) {
      res.render('contact', { sendvisibility: "flex", errvisibility: "none", imgFile: imgFile });
    } else {
      res.render('contact', { sendvisibility: "none", errvisibility: "flex"});
    }
  })
});


app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
