const express = require("express");
const router = express.Router();
const app = express();

// JSON not read by default - using instead of body parser
app.use(express.json());

// Item Models
const Place = require("../../models/Places");

// @route  GET api/items
// @desc   Get All Items
// @access Public
// already starting at /items/api
router.get("/", (req, res) => {
	//?
	Place.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route  POST api/items
// @desc   Post an Item
// @access Public
// already starting at /items/api
router.post("/", (req, res) => {
	//? only name is required based on how Schema was designed
	const newPlace = new Place({
		name: req.body.name,
		type: req.body.type,
		rating: req.body.rating,
		comment: req.body.comment,
		latitude: req.body.latitude,
		longitude: req.body.longitude
	});
	newPlace.save().then(place => res.json(place));
});

// @route  DELETE api/items/:id
// @desc   Deleta an Item
// @access Public
// already starting at /items/api
router.delete("/:id", (req, res) => {
	Place.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
