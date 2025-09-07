export const getLoginGreetingTemplate = (userName: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Back to BaliResumate</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 300;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 24px;
          color: #667eea;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .message {
          font-size: 16px;
          margin-bottom: 30px;
          color: #555;
        }
        .highlight {
          background-color: #f8f9ff;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 20px 0;
          transition: transform 0.2s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">BaliResumate</div>
          <h1>Welcome Back!</h1>
        </div>
        
        <div class="content">
          <div class="greeting">Hello ${userName}! 👋</div>
          
          <div class="message">
            Thank you for using <strong>BaliResumate</strong>! We're excited to see you back on our platform.
          </div>
          
          <div class="highlight">
            <strong>🎉 You're all set!</strong><br>
            Your login was successful and you can now access all the amazing features BaliResumate has to offer.
          </div>
          
          <div class="message">
            Ready to create your next outstanding resume? Let's get started!
          </div>
          
          <div style="text-align: center;">
            <a href="#" class="cta-button">Start Building Your Resume</a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>BaliResumate Team</strong></p>
          <p>Building careers, one resume at a time.</p>
          <p style="font-size: 12px; margin-top: 15px;">
            This email was sent because you successfully logged into your BaliResumate account.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
