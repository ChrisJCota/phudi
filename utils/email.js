const { Reservation, User, Restaurant } = require("../models");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL_HOST, EMAIL_PASSWORD } = process.env;

//send mail from gmail
//    const UserEmailData = await User.findByPk();
const sendConfirmation = async (userEmail, reservation, restaurantData) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_HOST, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });

  var MailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      // Appears in header & footer of e-mails
      name: "PHÜDI",
      link: "https://github.com/ChrisJCota/phudi",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  var response = {
    body: {
      name: "John Appleseed",
      intro: restaurantData.name,
      action: {
        instructions: reservation.party_number,
        button: {
          color: "#571313", // Optional action button color
          text: "Confirm your account",
          link: "https://github.com/ChrisJCota/phudi",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  let mail = MailGenerator.generate(response);
  var emailText = MailGenerator.generatePlaintext(response);

  let message = {
    from: EMAIL_HOST,
    to: "bcebel@gmail.com", // list of receivers
    subject: "Your Reservation", // Subject line
    text: emailText, // plain text body
    html: mail, // html body
  };

  await transporter.sendMail(message);

  // res.status(201).json("Get Bill Sucessfully");
};
module.exports = {
  sendConfirmation,
};
