const express = require('express');

//Routes imports
const index = require('./routes/index');
const users = require('./routes/users');
const posts = require('./routes/posts')
const auth = require('./auth');

const app = express();

app.use(express.json());

//middleware
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api', index);


app.use(express.static(__dirname + '/public'));



//error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});


app.listen(8080, () => console.log('Server started on port 8080.'));