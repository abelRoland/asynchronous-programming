'use strict';

const log = labeledLogger('1. Write URL');
const expect = chai.expect;

const origin = window.location.origin;
const path = '/isolate/fake-api/json-types.json';
const requestURL = origin + path;
log("requestURL: ", requestURL);


const parseResponse = (response) => {
  const parsedResponse = response.json();
  log('response: ', response, '\n',
    'parsed: ', parsedResponse);
  return parsedResponse;
};

const separateStrings = (jsonTypes) => {
  log('JSON Types:', jsonTypes);
  return jsonTypes.strings;
};

const testStrings = (strings) => {
  log('strings: ', strings);
  it('should be the strings from json-types.json', () => {
    expect(strings).to.deep.equal([
      "only double quotes!",
      "there is no 'undefined' in JSON",
      ""
    ]);
  });
};

const handleRejection = (err) => {
  log(err);
};


fetch(requestURL)
  .then(parseResponse)
  .then(separateStrings)
  .then(testStrings)
  .catch(handleRejection);

log('end of synchronous tasks');


