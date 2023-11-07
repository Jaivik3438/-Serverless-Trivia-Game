const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
const serviceAccount = require('./prefab-pixel-391815-firebase-adminsdk-pvkwu-1a437e2c67.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

exports.handler = async (event, context) => {
  const { teamName, achievementName } = event;

  try {

    const myemail = process.env.SENDER_EMAIL;
    const mypassword = process.env.APPLICATION_PASSWORD;

    const docRef = db.collection('Members').doc(teamName);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const membersData = docSnapshot.data().members;

      if (membersData && Array.isArray(membersData)) {
        const memberEmails = membersData.map(member => member.email);

        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: myemail,
            pass: mypassword
          }
        });

        for (const email of memberEmails) {
          const mailOptions = {
            from: myemail,
            to: email,
            subject: 'Achievement Unlocked',
            html: `<!DOCTYPE html>
              <html>
                <head>
                  <title>You have unlocked the achievement</title>
                </head>
                <body>
                  <h1>Dear User,</h1>
                  <p>
                  You have unlocked ${achievementName} during your play
                  </p>
                </body>
              </html>`
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to: ${email}`);
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      } else {
        console.log('No members found.');
      }
    } else {
      console.log('Document not found.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify('Emails fetched and sent successfully'),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error fetching or sending emails'),
    };
  }
};
