
const nodemailer=require('nodemailer');
const ApiError = require('./Apierror');

const sendEmail=(async(email,message,requesttype,timeofrequest)=>{
    console.log("email body",email);
    try {
        const transporter=nodemailer.createTransport({
            service:"Gmail",
            port:587,
            secure:false,
            auth:{
                user:process.env.SMTP_EMAIL,
                pass:process.env.SMTP_PASSWORD
            }
        })
        
        const Mailoptions={
            from:process.env.SMTP_EMAIL,
            to:email,
            subject:"Password Reset OTP",
            body:"resetPassword OTP",
            html:`
            <div style="font-family: Arial, sans-serif; padding: 7px;">
            <div style="font-family:Monospace; background-color:#77f571; text-align: center; padding: 20px;border-radius:5px">
         <h2 style="">Learning Portal Classerly</h2>
          </div>
            <p style="color: #666;">Dear User,</p>
            <p style="color: #666;">${requesttype}</p>
            <div style="text:center">
                <h3 style="padding: 5px;background-color: #fff;color: #333; font-size: 20px; margin: 0; width: 40% ;">${message}</h3>
            </div>
            <p style="color: #666;">${timeofrequest}</p>
            <p style="color: #666;">If you did not request this password reset, you can ignore this email.</p>
            <p style="color: #666;">Regards,<br/>Team,<br/>Learning Portal Classerly</p>
        </div>
        `
        }
        await transporter.sendMail(Mailoptions)
    } catch (error) {
    throw new ApiError(500,"something went wrong in sending email")
    }


})

module.exports=sendEmail;