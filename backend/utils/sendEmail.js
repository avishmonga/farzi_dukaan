const nodemailer = require("nodemailer")

const sendEmail = async(option)=>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.EMAIL_SERVICE,
        auth:{
           user:process.env.EMAIL_ID,
           pass:process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions ={
        from:"graphicalmanavish@gmail.com",
        to:option.email,
        subject:option.subject,
        text:option.message 
    } 

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail