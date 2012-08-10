var cradle = require('cradle');

function CloneDTO(db) {
	if(db instanceof cradle.Database)
		this._db = db;
	else
		throw new Error('CloneDTO must be initialized with a cradle.Database');
};

CloneDTO.prototype.get = function(id, callback) {
	this._db.get(id, callback);
};

CloneDTO.prototype.save = function(clone, callback) {
	if()
};

CloneDTO.prototype.checkout = function(callback) {
	
};

module.exports = CloneDTO;