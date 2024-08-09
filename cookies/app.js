const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dummy user data
const users = {
  admin: '{z91n"OfE9$8'
};

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  const userCookie = req.cookies.user;
  if (userCookie) {
    const decoded = Buffer.from(userCookie, 'base64').toString('utf8');
    const [prefix, username] = decoded.split(':');
    if (prefix === 'user' && users[username]) {
      req.user = username;
      return next();
    }
  }
  res.redirect('/login');
}

app.get('/', (req, res) => {
  const userCookie = req.cookies.user;
  let user = null;
  let message = null;
  
  if (userCookie) {
    const decoded = Buffer.from(userCookie, 'base64').toString('utf8');
    const [prefix, username] = decoded.split(':');
    if (prefix === 'user' && users[username]) {
      user = username;
      message = user === 'admin' ? 'Welcome admin!' : 'Only admin gets the cookies';
    }
  }
  if(user === 'admin'){
    res.render('admin', { flag: 'CTF{you_found_the_flag}' });
  }
  else{
    res.render('index', { user, message });
  }
  
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const userCookie = Buffer.from(`user:${username}`).toString('base64');
    res.cookie('user', userCookie, { httpOnly: true });
    if (username === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!users[username]) {
    users[username] = password;
    const userCookie = Buffer.from(`user:${username}`).toString('base64');
    res.cookie('user', userCookie, { httpOnly: true });
    res.redirect('/');
  } else {
    res.render('signup', { error: 'Username already exists' });
  }
});

app.get('/admin', isAuthenticated, (req, res) => {
  if (req.user === 'admin') {
    res.render('admin', { flag: 'CTF{you_found_the_flag}' });
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
