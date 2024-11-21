exports.forgotTemp = async (
  otp,
 email
  ) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <title>Supply Smart </title>
        <style>
          body {
            font-family: "Open Sans", sans-serif;
          }
          main {
            width: 90%;
            margin: auto;
          }
          table {
            width: 100%;
            text-align: center;
          }
          th {
            color: #eab221;
            font-size: 16px;
            padding: 18px 0;
            text-align: left;
          }
          td {
            padding: 0 30px;
            text-align: left;
          }
          p {
            margin: 10px 0;
          }
        </style>
      </head>
      <body
        style="
          height: 98vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <main>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
 
          </div>
            <h1 style="color: #390535; text-align: center; margin-top: 2rem">
                Task Manager
                </h1>
            <p style="color: #390535; text-align: center; margin-top: 2rem">
                Hello ${email},
                </p>
            <p style="color: #390535; text-align: center; margin-top: 2rem">
                You requested to reset your password. <br />
                Please use the following OTP to reset your password.
                </p>
            <p style="color: #390535; text-align: center; margin-top: 2rem">
                OTP: ${otp}
                </p>
            <p style="color: #390535; text-align: center; margin-top: 2rem">
                If you did not request a password reset, please ignore this email.
                </p>
            <p>

            <footer style="background: #390535">
            <p style="color: #ffffff; text-align: center; padding: 2rem">
              Need more help? <br />We are
              <a href="#3" style="color: #eab221">here</a>, ready to talk.
            </p>
          </footer>
        </body>
      </html>`;
  return html;
};
