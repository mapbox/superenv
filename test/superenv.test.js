var expect = require('expect.js'),
    fs = require('fs'),
    superenv = require('../');

describe('environment variable getting', function() {
    it('gets environment variables', function() {
        delete process.env.foo_bar;
        expect(superenv('foo')).to.eql({});
        process.env.foo_bar = 2;
        expect(superenv('foo')).to.eql({ bar: 2 });
        delete process.env.foo_bar;
        expect(superenv('foo')).to.eql({});
    });

    it('parses configuration files', function() {
        fs.writeFileSync('.foofoorc', JSON.stringify({ foo: 42 }));
        expect(superenv('foofoo')).to.eql({ foo: 42 });
        delete process.env.foo_bar;
        fs.unlinkSync('.foofoorc');
    });

    it('requires a namespace', function() {
        expect(function() {
            superenv();
        }).to.throwError('Namespace is required');
    });
});
