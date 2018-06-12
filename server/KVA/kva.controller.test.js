const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const mockReq = require('sinon-express-mock').mockReq;
const mockRes = require('sinon-express-mock').mockRes;
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;

const KVAModel = require('./kva.model');

//importing under test modules
const kvaController = require('./kva.controller');

describe("## Test KVA Create", ()=>{
    it("# Testing creation of Key Value Pair", (done)=>{
        const request = {
            body: {
              foo: 'bar',
            },
        }
        const req = mockReq(request);
        const res = {};
        const next = sinon.spy();
        res.json = sinon.spy();;

        sinon.mock(KVAModel)
            .expects('create')
            .withArgs({ 
                key:"foo",
                value: 'bar' 
            }).yields(null,{
                key:'foo',
                value:'bar',
                createdAt:1234567890//some value from db
            });

        kvaController.createKeyValue(req, res, next);
        expect( res.json.calledOnce).to.equal(true);
        done();

    });
})

describe("## Test KVA find", ()=>{

    let mockObj
    let clock
    const FAKE_CURRENT_TIME = 1528641000000
    beforeEach(()=>{
        sinon.createSandbox();
        clock = sinon.useFakeTimers(FAKE_CURRENT_TIME);
    })

    afterEach(()=>{
        sinon.restore();
        mockObj.restore();
        clock.restore();
    })

    it("# Testing findByKey without query param. Code should use the current timestamp", (done)=>{
        const request = {
            params: {
              key: 'someKey',
            },
        }
        const req = mockReq(request);
        const res = {};
        res.json = sinon.spy();
        const next = sinon.spy();

        const dbObj = {
            key:'someKey',
            value:'somevalue',
            createdAt:1234567890//some value from db
        }
        mockObj = sinon.mock(KVAModel)
            .expects('findOne').withArgs({key:'someKey', createdAt: {$lte: FAKE_CURRENT_TIME}})
            .chain('sort').withArgs({createdAt: 'desc'})
            .chain('exec')
            .yields(null, dbObj);

        kvaController.findByKey(req, res, next);
        expect(res.json.calledOnce).to.equal(true);
        expect(res.json.calledWithMatch({
            key:'someKey',
            value:'somevalue'
        })).to.be.true;
        done();
    });

    it("# Testing findByKey with query param. Code should use the timestamp provided as query parameter", (done)=>{
        const request = {
            query:{
                timestamp:1529345000
            },
            params: {
              key: 'someKey',
            },
        }
        const req = mockReq(request);
        const res = {};
        res.json = sinon.spy();
        const next = sinon.spy();

        const dbObj = {
            key:'someKey',
            value:'somevalue',
            createdAt:'1234567890'//some value from db
        }
        mockObj = sinon.mock(KVAModel)
            .expects('findOne').withArgs({key:'someKey', createdAt: {$lte: 1529345000000}})
            .chain('sort').withArgs({createdAt: 'desc'})
            .chain('exec')
            .yields(null, dbObj);

        kvaController.findByKey(req, res, next);
        expect(res.json.calledOnce).to.equal(true);
        expect(res.json.calledWithMatch({
            key:'someKey',
            value:'somevalue'
        })).to.be.true;
        done();
    });

    it("# Cannot find the key", (done)=>{
        const request = {
            params: {
              key: 'someKey',
            },
        }
        const req = mockReq(request);
        const res = {};
        res.json = sinon.spy();
        res.sendStatus = sinon.spy();
        const next = sinon.spy();
        mockObj = sinon.mock(KVAModel)
            .expects('findOne').withArgs({key:'someKey', createdAt: {$lte: FAKE_CURRENT_TIME}})
            .chain('sort').withArgs({createdAt: 'desc'})
            .chain('exec')
            .yields(null, null);

        kvaController.findByKey(req, res, next);
        expect(res.json.notCalled).to.equal(true);
        expect(res.sendStatus.calledOnceWithExactly(404)).to.equal(true);
        done();
    })
})