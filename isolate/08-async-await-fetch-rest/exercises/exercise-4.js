'use strict';


const log = labeledLogger('Exercise 3');
const expect = chai.expect;


// hint: ctr-f "filter" -> https://github.com/typicode/json-server

const usersByLocation = async (field = '', value = '') => {
  const findAddress = decodeURI(`${field}=${value}`);

	const url = `https://jsonplaceholder.typicode.com/users?address.${findAddress}`;

	const response = await fetch(url);

	if (!response.ok || response.status !== 200) {
		throw new Error('response is not okay');
	}

	const data = await response.json();

	return data[0];

};

const test1 = (user) => {
  log('user:', user);
  it('should have email "Nathan@yesenia.net"', () => {
    expect(user.email).to.equal("Nathan@yesenia.net");
  });
  console.log('');
};
usersByLocation('zipcode', '59590-4157')
  .then(data => test1(data))
  .catch(err => log(err));


const test2 = (user) => {
  log('user:', user);
  it('should have username "Elwyn.Skiles"', () => {
    expect(user.username).to.equal("Elwyn.Skiles");
  });
  console.log('');
};
usersByLocation('city', 'Howemouth')
  .then(data => test2(data))
  .catch(err => log(err));



const test3 = (user) => {
  log('user:', user);
  it('should have name "Glenna Reichert"', () => {
    expect(user.name).to.equal("Glenna Reichert");
  });
  console.log('');
};
usersByLocation('suite', 'Suite 449')
  .then(data => test3(data))
  .catch(err => log(err));



log('... end of synchronous tasks ...');
