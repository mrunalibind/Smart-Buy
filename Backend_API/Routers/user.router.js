let express = require("express")
let passport = require("../Routers/Google-ouath")
let {forgotPassword,logout,login,signup} = require("../Controller/user.controller")
let UserRouter = express.Router()
require('dotenv').config()

////////////////////login////////////////////////////////////////////
UserRouter.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

UserRouter.get('/auth/google/callback',

    passport.authenticate('google', { failureRedirect: '/user/auth/google/failure', session: false }),

    function (req, res) {
        //console.log(user)
        try {
            res.send({ msg: "login Success" })

        } catch (err) {

            res.status.send({ msg: "error" })

        }

    }
);

//////////////////////////////////////////////////////////login/////////////////////////////
UserRouter.post('/signup',signup)
UserRouter.get("/forgotPassword", forgotPassword)
UserRouter.delete("/logout",logout)
UserRouter.post('/login',login)




module.exports = { UserRouter }