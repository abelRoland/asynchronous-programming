'use strict';


const log = labeledLogger('3. Write URL');
const expect = chai.expect;

const origin = window.location.origin;
const path = '/isolate/04-fetch/fake-api/animals/worms.json';
const requestURL = origin + path;
log("requestURL: ", requestURL);


// careful!  these are not in order ;)

const testWormsTypes = (wormsTypes) => {
  log('wormsTypes: ', wormsTypes);
  it('these worms can be found in Siberia', () => {
    expect(wormsTypes).to.deep.equal({
      striped: [
        "siberia",
        "europe",
        "antarctica",
        "pacific islands",
        "indian subcontinent"
      ],
      wavy: [
        "siberia",
        "south america"
      ]
    });
  });
};

const parseResponse = (response) => {
  const parsedResponse = response.json();
  log('response: ', response, '\n',
    'parsed: ', parsedResponse);
  return parsedResponse;
};

const handleRejection = (err) => {
  log(err);
};

const separateAustralianTypes = (worms) => {
  log('worms:', worms);
  const siberianWorms = {};
  for (let kind in worms) {
    if (worms[kind].includes('siberia')) {
      siberianWorms[kind] = worms[kind];
    }
  }
  return siberianWorms;
};


fetch(requestURL)
  .then(parseResponse)
  .then(testWormsTypes)
  .then(separateAustralianTypes)
  .catch(handleRejection);

log('end of synchronous tasks');


