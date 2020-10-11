'use strict';


const log = labeledLogger('Exercise 8');
const expect = chai.expect;

const origin = 'https://jsonplaceholder.typicode.com';
const path = '/albums?userId=1&_limit=10';
log('path: ', path);


const parseResponse = (response) => {
  log('response: ', response);
  return response.json();
};

const processData = (data) => {
  log('data: ', data);
  const filteredObj=[];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj["id"]=data[i].id;
    obj["userId"]=data[i].userId;
    filteredObj.push(obj);
  }
  return filteredObj;
};

const testData = (actual) => {
  log('actual: ', actual);

  it('should have 10 albums', () => {
    expect(actual.length).to.equal(10);
  });
  it('all have userId 1', () => {
    const allHaveUserId1 = actual.every(album => album.userId === 1);
    expect(allHaveUserId1).to.be.true;
  });
  for (let i = 0; i < actual.length; i++) {
    const album = actual[i];
    it(`album ${i} has the correct keys`, () => {
      const albumKeys = Object.keys(album);
      expect(albumKeys).to.have.members(['id', 'userId']);
    });
  };
};

const handleRejection = (err) => {
  log(err);
};



fetch(origin + path)
  .then(res => parseResponse(res))
  .then(data => processData(data))
  .then(processedData => testData(processedData))
  .catch(err => handleRejection(err));



log('end of synchronous tasks');
