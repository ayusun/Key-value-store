const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const mockReq = require('sinon-express-mock').mockReq;
const mockRes = require('sinon-express-mock').mockRes;
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;

const errorValidation = require('../utils/validation-error');
//importing under test modules
const kvaValidator = require('./kva.validators');


describe("## Test KVA", ()=>{
    it("should validate my request when KVA Creation is called with string in value", (done)=>{
        const request = {
            body: {
              foo: 'bar',
            },
        }
        const req = mockReq(request);
        const res = mockRes();
        const spy = sinon.spy();
        kvaValidator.kvaInsert(req, res, spy);

        expect(spy.calledWithExactly()).to.be.true;
        done();
    })

    it("should validate my request when KVA Creation is called with Object in value", (done)=>{
        const request = {
            body: {
              foo: {
                  fizz:'Buzz'
              },
            },
        }
        const req = mockReq(request);
        const res = mockRes();
        const spy = sinon.spy();
        kvaValidator.kvaInsert(req, res, spy);

        expect(spy.calledWithExactly()).to.be.true;
        done();
    })

    it("should throw error when KVA Creation is called", (done)=>{
        const request = {
            body: {
              foo: 1,
            },
        }
        const req = mockReq(request);
        const res = mockRes();
        const spy = sinon.spy();
        kvaValidator.kvaInsert(req, res, spy);
        let expectedError = new errorValidation("InCorrect Value", 400)
        expect(spy.calledWithMatch(expectedError)).to.be.true;
        done();
    })

    it("should throw error when KVA Creation is called with multiple keys", (done)=>{
        const request = {
            body: {
              foo: '1',
              buzz:'2'
            },
        }
        const req = mockReq(request);
        const res = mockRes();
        const spy = sinon.spy();
        kvaValidator.kvaInsert(req, res, spy);
        let expectedError = new errorValidation("More than 1 key Specified", 400)
        expect(spy.calledWithMatch(expectedError)).to.be.true;
        done();
    })

})