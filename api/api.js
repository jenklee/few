
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
	/*var new_member = extend({
		joined: now
	}, req.body);
	console.log(new_member);
	*/
	console.log({
		joined: now
	});
	
    db.collection('members').insert(req.body, function(err, result){
		if(err) {
			res.send({ msg: err });
			throw err;
		}
	    res.json(result[0]);
    });
  }
};

exports.member = function(db) {
  return function(req, res) {
	var id = ObjectID.createFromHexString(req.params.id);
    db.collection('members').findOne({_id: id}, function(err, member){
		if(err) {
			res.send({ msg: err });
			throw err;
		}
	    res.json({member: member});
    });
  }
};