var express = require('express'),
    app = express(express.logger()),
    classifier = require('classifier'),
    bayes = new classifier.Bayesian();

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
    bayes.train(req.body.text, req.body.class);
    res.send(200, "updated\n");
});

/**
 * POST /classify
 *
 * classify a body of text.
 * expects the following fields in the request body:
 *     text - a string to train on
 */
app.post('/classify', function(req, res) {
    var text = req.body.text;
    res.send({
	"category": bayes.classify(text),
	"text": text
    });
});

/**
 * GET /backup
 *
 * serializes the state of the classifier to JSON
 */
app.get('/backup', function(req, res) {
    res.send(bayes.toJSON());
});

/**
 * POST /restore
 *
 * restores from a JSON backup
 * expects the following fields in the request body:
 *     dump - the serialized JSON
 */
app.post('/restore', function(req, res) {
    bayes.fromJSON(req.body)
    res.send(200, "loaded\n");
});


/**
 * POST /reset
 *
 * resets the classifier and blanks the training data
 */
app.post('/reset', function(req, res) {
    delete bayes;
    new classifier.Bayesian();
    res.send(200, "classifier reset\n");
});

app.get('/', function(req, res) {
    res.send(200, "and... SCENE!\n");
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'))

console.log("Express server listening on port " + app.get('port'));
