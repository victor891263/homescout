const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'autoreply978@gmail.com',
        pass: process.env.SMTP_PW
    }
})

async function sendVerificationEmail(address, verId) {
    await transporter.sendMail({
        from: 'autoreply978@gmail.com',
        to: address,
        subject: '[Homescout] Verify your email address',
        text: `Thank you for creating a Homescout account. Visit this link to verify your email address and complete the account creation process: ${process.env.CLIENT_URL}/verify/${verId}`
    })
}

async function sendPasswordResetEmail(address, verId) {
    await transporter.sendMail({
        from: 'autoreply978@gmail.com',
        to: address,
        subject: '[Homescout] Recover your password',
        text: `To reset your password, visit this link: ${process.env.CLIENT_URL}/reset/${verId}`
    })
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail }