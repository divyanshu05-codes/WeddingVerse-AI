const nodemailer =
  require("nodemailer");

// ======================================================
// SMTP TRANSPORTER
// ======================================================

const transporter =
  nodemailer.createTransport({
    host:
      process.env.SMTP_HOST,

    port: Number(
      process.env.SMTP_PORT || 587
    ),

    secure:
      process.env.SMTP_SECURE ===
      "true",

    auth: {
      user:
        process.env.SMTP_USER,

      pass:
        process.env.SMTP_PASSWORD,
    },
  });

// ======================================================
// VERIFY SMTP CONNECTION
// ======================================================

transporter.verify(
  (error, success) => {

    if (error) {
      console.error(
        "❌ SMTP connection failed:"
      );

      console.error(
        error
      );

      return;
    }

    console.log(
      "✅ SMTP server is ready to send emails."
    );
  }
);

// ======================================================
// SEND PASSWORD RESET EMAIL
// ======================================================

const sendPasswordResetEmail =
  async (
    email,
    resetUrl
  ) => {

    console.log(
      "📧 Sending password reset email..."
    );

    console.log(
      "📨 To:",
      email
    );

    console.log(
      "🔗 Reset URL:",
      resetUrl
    );

    const info =
      await transporter.sendMail({
        from:
          process.env.EMAIL_FROM,

        to:
          email,

        subject:
          "Reset Your WeddingVerse Password",

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 20px;
            "
          >

            <h2
              style="
                color: #db2777;
              "
            >
              WeddingVerse AI
            </h2>

            <p>
              We received a request
              to reset your password.
            </p>

            <p>
              Click the button below
              to create a new password.
            </p>

            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                padding:12px 24px;
                background:#db2777;
                color:white;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;
              "
            >
              Reset Password
            </a>

            <p
              style="
                margin-top:20px;
                color:#666;
              "
            >
              This link will expire
              in 15 minutes.
            </p>

            <p
              style="
                color:#666;
              "
            >
              If you didn't request
              a password reset,
              you can safely ignore
              this email.
            </p>

          </div>
        `,
      });

    console.log(
      "✅ Email accepted by SMTP:",
      info.messageId
    );

    console.log(
      "📨 SMTP response:",
      info.response
    );

    return info;
  };

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  sendPasswordResetEmail,
};