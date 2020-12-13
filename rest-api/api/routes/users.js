// const express = require("express");
// const router = express.Router();

// const UserController = require('../controllers/users');
// const checkAuth = require('../middleware/check-auth');

// router.post("/signup", UserController.user_signup);

// router.post("/login", UserController.user_login);

// router.delete("/:userId", checkAuth, UserController.user_delete);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {getUserById,getUser} = require("../controllers/users")

router.get("/users",getUser)
router.get("/token",(req, res, next)=>{
    res.status(200).json({
        status:"ok",
        appid:process.env.appid,
        token:process.env.token,
        channel:process.env.channel
    });
})

module.exports=router