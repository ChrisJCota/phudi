const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL_HOST, EMAIL_PASSWORD } = process.env;

const signup = (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_HOST, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });
  let reservation = `
{
  "@context": "http://schema.org",
  "@type": "FoodEstablishmentReservation",
  "reservationNumber": "unhbootcamp",
  "reservationStatus": "http://schema.org/Confirmed",
  "underName": {
    "@type": "Person",
    "name": "Brian Ebel"
  },
  "reservationFor": {
    "@type": "FoodEstablishment",
    "name": "Phudi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "34 Sage Way",
      "addressLocality": "Durham",
      "addressRegion": "New Hampshire",
      "postalCode": "03824",
      "addressCountry": "United States"
    }
  },
  "startTime": "2023-04-20T08:00:00+00:00",
  "partySize": "2"
}`;

  let message = {
    from: '"PHUDI",<phudi.res@gmail.com>', // sender address
    to: "schema.whitelisting+sample@gmail.com, bcebel@gmail.com", // list of receivers
    subject: "Your PHUDI Reservation", // Subject line
    text: "Succesfully Register with us.", // plain text body
    html: `${reservation}<script type="application/ld+json">${reservation}</script>Holy Cow`,
  };

  transporter.sendMail(message).then((info) => {
    return res
      .status(201)
      .json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
};

//send mail from gmail
const gEmail = (req, res) => {
  const { userEmail } = req.body;

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
      intro:
        "Thank you for your reservation at __________! Get ready for an amazing dining experience.",
      action: {
        instructions:
          "To get started with pressing random buttons, please click here:",
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
    to: userEmail, // list of receivers
    subject: "Your Reservation", // Subject line
    text: emailText, // plain text body
    html: mail, // html body
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should recieve an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("Get Bill Sucessfully");
};
module.exports = {
  signup,
  gEmail,
};
