'use strict';

const chai = require('chai');
chai.should();
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const sinon = require('sinon');

const {postMethodHandler} = require('../src/post-message');

describe('POST new message', function() {
  let postHandler;
  const datastore = {
    key: sinon.fake.returns('da key'),
    save: sinon.fake.resolves(),
  };

  it('should return a handler function', function() {
    postHandler = postMethodHandler(datastore, 'message');
    (typeof(postHandler)).should.equals('function');
  });

  it('should do things', async function() {
    const req = {
      body: {sender: '1', text: '2'},
    };
    const res = {status: sinon.fake.returns({send: sinon.fake.returns()})};
    this.clock = sinon.useFakeTimers({now: 33});

    await postHandler(req, res);

    datastore.key.should.have.been.calledWithExactly('message');
    datastore.save.should.have.been.calledWithExactly(
        {
          key: 'da key',
          data: {sender: '1', text: '2', timestamp: new Date(33)},
        },
    );
    res.status.should.have.been.calledWithExactly(200);
  });

  after(function() {
    sinon.restore();
    this.clock.restore();
  });
});
