const { Router } = require("express");
const { check } = require("express-validator");

const { getSearch } = require("../controllers/search");

let router = Router();

router.get('/:colection/:term', getSearch);


module.exports = router;