const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usersPatch,
  usersDelete,
  usersPost,
  userError,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);
router.put("/:id", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);
router.post("/", usersPost);
router.get("*", userError);

module.exports = router;
