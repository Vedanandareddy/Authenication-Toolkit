import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv"

dotenv.config()

export const mailtrapclient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Vedananda",
};


// const recipients = [
//   {
//     email: "vedananda69@gmail.com",
//   }
// ];

// mailtrapclient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",// we can send html  instead of text
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);