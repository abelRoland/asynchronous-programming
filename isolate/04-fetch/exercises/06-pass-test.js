'use strict';

// what data in which .json file sums to 0?

const log = labeledLogger('6. Pass Test');
const expect = chai.expect;

const origin = window.location.origin;
const path = '/isolate/fake-api/json-types.json';
const requestURL = origin + path;
log("requestURL: ", requestURL);

const sumNumbers = (data) => {
  return data['numbers'].reduce((acc, next) => acc + next) 
};

const handleRejection = (err) => {
  log(err);
};

const testSum = (sum) => {
  log('sum: ', sum);
  it('sum should be 3', () => {
    expect(sum).to.equal(3);
  });
};

const parseResponse = (response) => {
  const parsedResponse = response.json();
  log('response: ', response, '\n',
    'parsed: ', parsedResponse);
  return parsedResponse;
};

// something is missing ....
fetch(requestURL)
  .then(parseResponse)
  .then(sumNumbers)
  .then(testSum)
  .catch(handleRejection);

log('end of synchronous tasks');


