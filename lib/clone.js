var util = require('util'),
	events = require('events'),
	_ = require('underscore'),
	cradle = require('cradle'),
	async = require('async');

function clone(opts) {
	_.defaults(opts, {
		host: "127.0.0.1",
		port: 5984,
		db: "dev"
	});
	 
	var db = new cradle.Connection(opts).database(db);
}

function CloneStore(work_db) {
	events.Emitter.call(this);
	
	if(work_db instanceof cradle.Database)
		this._work_db = work_db;
	else
		throw new Error('database "' + String.toString(db) + '" is not an instance of cradle.Database');
}

inherits(CloneStore, events.EventEmitter);

CloneStore.prototype.clone = function clone(optsOrSources, callback) {	
	//retrieve sources
	var sources = _.isArray(optsOrSources) ? optsOSources : (optsOrSources.sources || []);
	if(sources.length <= 0)
		callback(new Error('Cannot create clone, no source URLs were provided'));
		
	
};



CloneStore.prototype._createResource = function createResource(callback) {
	
};

CloneStore.prototype.checkout = function checkout(user, callback) {
	async.auto({
		
	}, callback);
}

function clone(db, callback) {
	
	
}

function listen(db, callback) {
	if(!(db instanceof cradle.Database))
		callback(new Error('database "' + String.toString(db) + '" is not an instance of cradle.Database'));
	else {
		var feed = db.changes({ since: now });
		feed.on('change', function(change) {
			
		});
	}	
}

function foo(dbs) {
	if(!dbs)
		return;
		
	if(!_.isArray(dbs))
		dbs = [ dbs ];
		
	async.forEach(dbs,)
}
