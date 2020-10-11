'use strict';


const log = labeledLogger('Exercise 7');
const expect = chai.expect;

const origin = 'https://jsonplaceholder.typicode.com';
const path = '/users';
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
    obj["name"]=data[i].name;
    obj["username"]=data[i].username;
    filteredObj.push(obj);
  }
  return filteredObj;
};


const testData = (actual) => {
  log('actual: ', actual);

  it('should have 10 users', () => {
    expect(actual.length).to.equal(10);
  });
  for (let i = 0; i < actual.length; i++) {
    const user = actual[i];
    it(`user ${i} has the correct keys`, () => {
      const userKeys = Object.keys(user);
      expect(userKeys).to.have.members(['id', 'name', 'username']);
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
