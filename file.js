var fs = require('fs');

function move(sourcePath, destPath, callback) {
	var source = fs.createReadStream(sourcePath);
	var dest = fs.createWriteStream('public/' + destPath);
	source.pipe(dest);
	if (callback != undefined)
		source.on('end', callback);
}

function route (req, res) {

	if (req.body["move-to-folder"] != undefined) {
		var destPath = req.body["move-to-folder"] + req.files.file.name;
		var sourcePath = req.files.file.path;
		move(sourcePath, destPath, function() {
			res.json({status: 'success', filepath: destPath});
		});
	} else {
		res.json({status: 'success', filepath: req.files.file.path});
	}
};


module.exports = route;