module.exports = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    mailgun_api_key: process.env.API,
    mailgun_sandbox: process.env.SANDBOX
}