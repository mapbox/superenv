[![Build Status](https://travis-ci.org/mapbox/superenv.png)](https://travis-ci.org/mapbox/superenv)

## superenv

A subset of [rc](https://github.com/dominictarr/rc) that pulls configuration
variables from JSON and ini configuration files and environment variables.

### Example

```js
var superenv = require('superenv');

// looks for ~/.mapbox.rc and so on, returns
// an object
var env = superenv('mapbox');
```

### API

`superenv(prefix)`

Given a prefix that forms the name of configuration files and the prefix
of environment variables, give settings.

### LICENSE

BSD / MIT / Apache2, same as rc, because this is based on rc by [Dominic Tarr](https://github.com/dominictarr)
