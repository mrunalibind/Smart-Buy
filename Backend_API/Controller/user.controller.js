let passport = require("../Routers/Google-ouath")
let { UserModel } = require("../Models/User.Model")
let nodemailer = require("nodemailer")
let { redis } = require('../redis.db')
let jwt = require("jsonwebtoken")
let bcrypt = require('bcrypt')
require('dotenv').config()
let otp = {}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bluearpon4567@gmail.com',
        pass: process.env.password,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

function generateOtp() {

    let OTP = Math.floor(Math.random() * (1000 - 1 + 1) + 7000)

    let onetime = OTP

    otp.OneTimePassword = onetime

    return OTP
}

let forgotPassword = async (req, res) => {

    let { email, password } = req.body

    let data = await UserModel.find({ email: email })

    if (data.length !== 0) {

        let mailOptions = {
            from: "bluearpon4567@gmail.com",
            to: email,
            subject: "One Time Verification(OTP)",
            html: `<body>
            <div style="font-family: Arial, sans-serif; font-size: 20px; color: #000000;">
              <p>Dear, ${data[0].name}</p>
              <p> I hope this email finds you well. As per your request, please find below your one-time password (OTP) to verify your identity and ensure the security of your account:</p>
              <p> <strong style="color: #ff0000; font-weight:300">${generateOtp()}</strong></p>
              <p>Please note that this OTP is valid for a limited time only, so we advise that you use it as soon as possible. If you have any questions or concerns regarding this OTP, please do not hesitate to contact us.</p>
              <p>Thank you for your trust in our services and for helping us maintain the security of your account.</p>
              <p>Best regards,</p>
              <p>The Verification Team</p>
            </div>
          </body>`



        }

        transporter.sendMail(mailOptions, async (err, success) => {

            if (err) {

                res.status(500).send({ "message": "Email is wrong" })

            } else {

                console.log(otp.OneTimePassword)

                res.send({ "OTP": otp.OneTimePassword })

            }
        })



    } else {

        res.status(404).send({ msg: "user is not registered in our website" })

    }

}


let logout = async (req, res) => {

    let { email } = req.body
    let accessToken = await redis.get(email)
    //console.log(accessToken)
    if (accessToken == null) {

        res.status(404).send({ msg: "accesstoken is not getting, and also you should've to send email to the backend" })
    } else {

        await redis.del(email, (err, result) => {

            if (err) {

                res.status(505).send({ msg: "something wrong ot deleting of accesstoken in redis" })

            } else {

                res.send({ msg: "logout Success" })

            }
        })
    }


}


let login = async (req, res) => {

    let { email, password } = req.body

    let data = await UserModel.find({ email: email })

    bcrypt.compare(password, data[0].password, (err, result) => {

        if (err) {

            res.status(500).send({ msg: err.message })

        } else {

            jwt.sign({ email: email }, process.env.privateKey, { expiresIn: '4h' }, async (err, token) => {

                if (err) {

                    res.status(500).send({ msg: "something is wrong to generating of accesstoken" })

                } else {

                    await redis.set(email, token)

                    res.send({ msg: "login Success" })

                }
            })


        }

    })

}

module.exports = { forgotPassword, logout, login }