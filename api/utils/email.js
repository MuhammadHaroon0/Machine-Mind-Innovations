const nodemailer = require('nodemailer');

class Email{
    constructor(user)
    {        
        this.to=user.email
        this.from=process.env.MAIL_SENDER
        this.name=user.name
    }
    newTransport()
    {
        // if(process.env.NODE_ENV==='production')
        // return 1;
        return nodemailer.createTransport({
            service:process.env.MAIL_SERVICE,
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }

        })
    }
    async send(subject,template)
    {
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html:template
        }
        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome()
    {
        await this.send('Welcome','Welcome to Machine Minds Innovations') //signing up the user
    }

    async sendResetPassword(url)
    {
        await this.send('Passsword Reset',`Forgot your password? Click on this url <a href=${url}>${url}<a> to reset your password. If you don't forgot your password just ignore this message`) 
        //forgot password
    }
}

module.exports=Email