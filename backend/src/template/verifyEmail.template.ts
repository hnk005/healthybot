export const templateVerifyEmail = (link: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận đăng ký tài khoản</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: white;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: white !important;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Xác nhận đăng ký tài khoản</h1>
        </div>
        <div class="content">
            <h3>Nhấp vào liên kết sau để xác nhận tài khoản của bạn:</h3>
            <a href="${link}" class="button">Xác nhận tài khoản</a>
            <p>Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 HealthyBot. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
