const Router = require("Router")
const router = Router();
const registerUser = require('../controllers/user.controller')
const upload = require("../middlewares/multer.middleware")

router.route('/register').post(
        upload.fields([
                {
                        name: "avtar",
                        maxCount:1
                },{
                        name:"coverImage",
                        maxCount:1
                }
        ]),
        registerUser
)

module.exports = router;