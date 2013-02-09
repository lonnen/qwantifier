
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(express.logger());

// enable json, urlencoding, and multipart form
// processing into req.body var
app.use(express.bodyParser());


// if app.get('env') == 'development'
app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * POST /train
 * 
 * supervised training of a classification on a body of text.
 * expects the following fields in the request body:
 *     text  - a string to train on
 *     class - a category to classify the text as (default: unlassified)
 */
app.post('/train', function(req, res) {
    res.send({"query": req.query, "params": req.params, "body": req.body});
});

/**
 * POST /classify
 *
 * classify a body of text.
 * expects the following fields in the request body:
 *     text - a string to train on
 */
app.post('/classify', function(req, res) {
    res.send({"query": req.query, "params": req.params, "body": req.body});
});

/**
 * GET /backup
 *
 * serializes the state of the classifier to JSON
 */
app.get('/backup', function(req, res) {
    res.send({"query": req.query, "params": req.params, "body": req.body});
});

/**
 * POST /restore
 *
 * restores from a JSON backup
 * expects the following fields in the request body:
 *     dump - the serialized JSON
 */
app.post('/restore', function(req, res) {
    res.send({"query": req.query, "params": req.params, "body": req.body});
});


/**
 * POST /reset
 *
 * resets the classifier and blanks the training data
 */
app.post('/restore', function(req, res) {
    res.send({"query": req.query, "params": req.params, "body": req.body});
});

app.get('/', function(req, res) {
    res.send(200, "and... SCENE!");
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'))

console.log("Express server listening on port " + app.get('port'));
