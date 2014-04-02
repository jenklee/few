
exports.members = function(db){
	return function(req, res) {
		db.collection('members').find().toArray(function (err, items) {
			if(err) {
				res.send({ msg: err });
				throw err;
			}
		    res.json(items);
		});
	}
};

exports.addmember = function(db) {
  return function(req, res) {
	var now = new Date();
	var member = req.body;
	member['joined'] = now;
	
    db.collection('members').insert(member, function(err, result){
		if(err) {
			res.send({ msg: err });
			throw err;
		}
	    res.json(result);
    });
  }
};

exports.member = function(db) {
  return function(req, res) {
	var id = mongojs.ObjectId(req.params.id);
    db.collection('members').findOne({_id: id}, function(err, member){
		if(err) {
			res.send({ msg: err });
			throw err;
		}
	    res.json({member: member});
    });
  }
};


exports.stats_members = function(db) {
	return function(req, res) {
		db.collection('members').count({}, function(err, stats) {
		    if(err) {
				res.send({ msg: err });
				throw err;
			}
		    res.json({count: stats});
		});
	}
}


exports.stats_founders = function(db) {
	return function(req, res) {
		db.collection('members').aggregate([
			{ $match: { "isfemalefounder" : true} },
			{ $group: { _id:{companyname: "$companyname", companyurl: "$companyurl"} } },
			{ $sort: { count: -1 } }
		], function(err, stats) {
		    if(err) {
				res.send({ msg: err });
				throw err;
			}
		    res.json(stats);
		});
	}
}

exports.stats_city = function(db) {
	return function(req, res) {
		db.collection('members').aggregate([
			{ $project: { "place" : "$place"} },
			{ $group: { _id:{ long_name: "$place.vicinity"}, count: { $sum: 1 } } },
			{ $sort: { count: -1 } }
		], function(err, stats) {
		    if(err) {
				res.send({ msg: err });
				throw err;
			}
		    res.json(stats);
		});
	}
}

exports.stats_country = function(db) {
	return function(req, res) {
		db.collection('members').aggregate([
			{ $project: { "place" : "$place"} },
			{ $unwind: "$place.address_components" },
			{ $unwind: "$place.address_components.types" },
			{ $group: { _id:{ long_name: "$place.address_components.long_name", type: "$place.address_components.types" }, count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $group: { _id: "$_id.type", long_name: { $push: { long_name: "$_id.long_name", count: "$count"  } }  } },
			{ $match: {_id: "country"}}
			
		], function(err, stats) {
		    if(err) {
				res.send({ msg: err });
				throw err;
			}
		    res.json(stats);
		});
	}
}

