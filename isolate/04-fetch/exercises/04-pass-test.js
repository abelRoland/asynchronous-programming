'use strict';


const log = labeledLogger('4. Pass Test');
const expect = chai.expect;

const origin = window.location.origin;
const path = '/isolate/04-fetch/fake-api/food/wet/mush.json';
const requestURL = origin + path;
log("requestURL: ", requestURL);



const parseResponse = (response) => {
  const parsedResponse = response.json();
  log('response: ', response, '\n',
    'parsed: ', parsedResponse);
  return parsedResponse;
};

const filterMushes = (mushes) => {
  log('all mushes:', mushes);
  //let keys = Object.keys(mushes)
  //let mush = keys.filter(keys => mushes[keys] === true)
  return Object.keys(mushes).filter(keys => mushes[keys] === true);
};

const testFilteredMushes = (trueMush) => {
  log('trueMush: ', trueMush);
  it('these mush are true', () => {
    expect(trueMush).to.deep.equal(['grey', 'orange']);
  });
};

const handleRejection = (err) => {
  log(err);
};


// careful, this might not be right
fetch(requestURL)
  .then(parseResponse)
  .then(filterMushes)
  .then(testFilteredMushes)
  .catch(handleRejection);





log('end of synchronous tasks');
