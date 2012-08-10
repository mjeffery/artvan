var _ = require('underscore');
var async = require('async');

function Resource(work_db, options) {
	if(options.dest)
}



function refreshDocs(db, emitter, after_refresh) {
	
	async.
}

function refreshViews(db, emitter, after_refresh) {

	function views(doc) { return (doc.views) ? _.keys(doc.views) : [] };

	async.waterfall([
		//emit 'start-refresh' event
		function(callback) {
			emitter.emit('start-refresh', db.name);
			callback(null);
		},
		//look up all design documents in the target database
		function(callback) {
			db.view('_all_docs', {
				startkey: '_design/',
				endkey: '_design0',
				include_docs: true
			}, callback);
		},
		//get all views used in the database
		function(response, callback) {
			//get all views defined in the document
			var all_views = _.chain(response)	
					 		 .pluck('doc')
							 .map(function(doc) {
							 	return _.map(views(doc), function(view) {
									return doc._id + '/' + view; 
								})
							 })
							 .flatten()
							 .value();
							 
			callback(null, all_views);
		},
		//create a worker queue and make update calls to all the view
		function(all_views, outer_callback) {
			var queue = async.queue(
				function(view, inner_callback) {
					db.view(view, {
						limit: 0,
						stale: 'update_after'
					},
					inner_callback)
				});
				
			queue.concurrency = 10;
			queue.push(all_views);
			queue.drain(outer_callback);
		}],
		//emit 'end-refresh' or 'error' then invoke callback
		function(err) {
			(err) ?  emitter.emit('error', err) : emitter.emit('end-refresh', db.name);
			if(after_refresh) after_refresh(err);
		}
	);
}
