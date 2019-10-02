
var should = require('should');
var supertest = require('supertest');

describe('spec', function(){
    it('should pass', function(done){
        done();
    });

    it('should not pass', function(done){
        throw "don't pass";
        done();
    });
})