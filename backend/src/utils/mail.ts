import {
  SESClient,
  SESClientConfig,
  SendEmailCommand,
} from "@aws-sdk/client-ses";
import "dotenv/config";

const config: SESClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_SES_MAIL_ID ?? "",
    secretAccessKey: process.env.AWS_SES_MAIL_SECRET ?? "",
  },
  region: process.env.AWS_REGION ?? "",
};

const client = new SESClient(config);
const senderAddress = process.env.SENDER_MAIL

const email_template = (email: string, verificationLink: string) => {
  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    /* Base styles */
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      color: #111827;
      line-height: 1.5;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    /* Header */
    .header {
      background-color: #111827;
      padding: 24px;
      text-align: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;
    }
    
    /* Content */
    .content {
      padding: 32px 24px;
      text-align: center;
    }
    
    h1 {
      margin-top: 0;
      color: #111827;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    
    p {
      margin-bottom: 24px;
      color: #4b5563;
      font-size: 16px;
    }
    
    /* Button */
    .button {
      display: inline-block;
      background-color: #111827;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: bold;
      text-decoration: none;
      margin-bottom: 24px;
      transition: background-color 0.2s;
    }
    
    .button:hover {
      background-color: #374151;
    }
    
    .verification-code {
      background-color: #f3f4f6;
      padding: 16px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 24px;
      letter-spacing: 4px;
      color: #111827;
      margin-bottom: 24px;
      display: inline-block;
    }
    
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 24px 0;
    }
    
    .help-text {
      font-size: 14px;
      color: #6b7280;
    }
    
    /* Footer */
    .footer {
      background-color: #f3f4f6;
      padding: 24px;
      text-align: center;
    }
    
    .social-links {
      margin-bottom: 16px;
    }
    
    .social-link {
      display: inline-block;
      margin: 0 8px;
    }
    
    .social-icon {
      width: 24px;
      height: 24px;
      background-color: #6b7280;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      text-decoration: none;
    }
    
    .footer-text {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .footer-link {
      color: #4b5563;
      text-decoration: underline;
    }
    
    /* Responsive */
    @media (max-width: 640px) {
      .container {
        margin: 0;
        border-radius: 0;
      }
      
      .content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Arikoo</div>
    </div>
    
    <div class="content">
      <h1>Verify Your Email Address</h1>
      <p>Thanks for signing up! Please verify your email address to get started. Click the button below to complete your verification.</p>
      
      <a href=${verificationLink} class="button">Verify Email Address</a>
      
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all; margin-bottom: 24px;">
        <a href=${verificationLink} style="color: #4b5563; font-size: 14px;">${verificationLink}</a>
      </p>
      
      <div class="divider"></div>
      
      <p class="help-text">If you didn't create an account, you can safely ignore this email.</p>
      <p class="help-text">This verification link will expire in 24 hours.</p>
    </div>
    
      
     
      <p class="footer-text">HSR Layout, Bengaluru, India</p>
    </div>
  </div>
</body>
</html>`
  const input = {
    Source: senderAddress,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Email Verification",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: template,
          Charset: "UTF-8",
        },
      },
    },
  };
  return input;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verification_link = `${process.env.AUTH_PUBLIC_URL}/verify?token=${token}`;
  const mail_obj = email_template(email, verification_link);
  try {
    const command = new SendEmailCommand(mail_obj);
    return await client.send(command);
  } catch (error) {
    console.log(error);
    // return false;
  }
};
