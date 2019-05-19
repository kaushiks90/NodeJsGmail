const keys = require('./keys')

const opts = {
    from: keys.from,
    to: keys.to,
    password: keys.password,
    host: keys.host,
};

const config = {
    transporter: {
        host: opts.host,
        port: 465,
        secure: true

    },
    auth: {
        user: opts.from,
        password: opts.password
    },
    mailOptions: {
        from: opts.from,
        to: opts.to,
        subject: "New Company Request",
        text: "Email"
    },
    messages: {
        success: "Email has been sent"
    }

}


module.exports = config;