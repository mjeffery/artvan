var cradle = require('cradle');
var async = require('async');
var design_docs = require('./design_docs/util');

var WORK_DB = 'artvan_working';

function CloneServer() {
	
} 

function init(connOpts) {
	var conn = cradle.Connection(connOpts);
	conn.exists(WORK_DB, function(err, exists) {
		if(err) {
			
		}
		else {
			if(exists) {
				
			}
			else {
				
			}
		}
	});
}

function foo(db) {
	async.auto({
		deploy_users: async.apply(util.deploy, db, 'users'),
		deploy_
	});
}
