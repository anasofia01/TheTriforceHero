const { exampleFunction } = require('../utils/helpers');

const event1Handler = (socket, db, io) => {
	return () => {};
};

const event2Handler = (socket, db, io) => {
	return () => {};
};

module.exports = {
	event1Handler,
	event2Handler,
};
