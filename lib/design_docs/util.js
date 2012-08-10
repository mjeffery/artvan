var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var async = require('async');
var cradle = require('cradle');

function deploy(db, id, afterCheck) {
	async.auto({
		//load <id>.json from the designDocs folder
		get_local: function(callback) {
			var filename = path.join(__dirname, './' + id + '.json');
			fs.readFile(filename, callback);
		},
		//parse the local design doc from JSON
		parse_local: ['get_local', function(callback, results) { 
			callback(null, JSON.parse(results.get_local));
		}],
		//fetch '_design/<id>' from couchdb
		get_remote: function(callback) {
			db.get('_design/' + id, callback);
		},
		//sanitize system fields from document
		clean_remote: ['get_remote', function(callback, results) {
			callback(null, _.reject(results.get_remote, function(key) { 
				return /^_/.test(key); 
			}));
		}],
		//get the '_rev' field from 
		get_rev: ['get_remote', function(callback, results) {
			callback(null, results.get_remote._rev);
		}],
		//compare the string representations of the 
		requires_update: ['get_local', 'clean_remote', function(callback, results) {
			var local = results.get_local,
				remote = JSON.stringify(results.clean_remote);
			callback(null, local === remote);
		}],
		//update the design document if necessary
		update: ['parse_local', 'get_rev', 'requires_update', function(callback, results) {
			if(results.requires_update) 
				db.save('_design/' + id, results.results.get_rev, results.parse_local, callback);
			else
				callback(null, true);
		}]
	},
	afterCheck);
}

module.exports.deploy = deploy;
