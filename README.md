Qwantifier
----------

A node app crudely wrapping harthur's excellent [classifier](https://github.com/harthur/classifier/) in Express to create a classifier webservice. Restarting the app will clear the classifier (state is not persistent).

TODO:

* The classifier supports Redis as a backend. It should be easy enough to add Redis support with an in-memory fallback.
* Restrict methods with side effects with an optional auth of some kind (basic? simple password?).
* Tests have not been worth investing in, yet. If the app grows it will benefit some.

This is one of many experiments used for investigating the [qwantzle](http://www.qwantz.com/index.php?comic=1663).