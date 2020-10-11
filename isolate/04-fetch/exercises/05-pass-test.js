'use strict';

// which data entry has 5 entries?
const log = labeledLogger('5. Pass Test');
const expect = chai.expect;

const origin = window.location.origin;
const path = '/isolate/fake-api/food/dry/grains.json';
const requestURL = origin + path;
log("requestURL: ", requestURL);

const parseResponse = (response) => {
  const parsedResponse = response.json();
  log('response: ', response, '\n',
    'parsed: ', parsedResponse);
  return parsedResponse;
};

const lengthOfData = (data) => {
  return data.length;
};

const testDataLength = (dataLength) => {
  log('dataLength: ', dataLength);
  it('data should have length 5', () => {
    expect(dataLength).to.equal(5);
  });
};

const handleRejection = (err) => {
  log(err);
};

fetch(requestURL)
  .then(parseResponse)
  .then(lengthOfData)
  .then(testDataLength)
  .catch(handleRejection);

log('end of synchronous tasks');


