var xtend = require('xtend'),
    path = require('path'),
    fs = require('fs'),
    ini = require('ini');

var etc = '/etc';
var win = process.platform === 'win32';
var home = win ?
    process.env.USERPROFILE :
    process.env.HOME;

module.exports = function(name) {
    if (!name) throw new Error('Namespace required');
    var local = findUp('.' + name + 'rc');
    return xtend(
        win ? {} : read(path.join(etc, name, 'config')),
        win ? {} : read(path.join(etc, name + 'rc')),
        read(path.join(home, '.config', name, 'config')),
        read(path.join(home, '.config', name)),
        read(path.join(home, '.' + name, 'config')),
        read(path.join(home, '.' + name + 'rc')),
        read(local),
        prefixedEnv(name + '_'));
};

function read(file) {
    try { return parse(fs.readFileSync(file, 'utf-8'));
    } catch (err) { return; }
}

function parse(content, file) {
    // if it ends in .json or starts with { then it must be json.
    // must be done this way, because ini accepts everything.
    // can't just try and parse it and let it throw if it's not ini.
    // everything is ini. even json with a systax error.

    if ((file && /\.json$/.test(file)) || /^\s*{/.test(content)) {
        return JSON.parse(content);
    } else {
        return ini.parse(content);
    }
}

function prefixedEnv(prefix, env) {
    env = env || process.env;
    var obj = {}, l = prefix.length;
    for (var k in env) {
        if ((i = k.indexOf(prefix)) === 0) obj[k.substring(l)] = env[k];
    }
    return obj;
}

function findUp(rel) {
    function find(start, rel) {
        var file = path.join(start, rel);
        try {
            fs.statSync(file);
            return file;
        } catch (err) {
            if (path.dirname(start) !== start) {
                return find(path.dirname(start), rel);
            }
        }
    }
    return find(process.cwd(), rel);
}
