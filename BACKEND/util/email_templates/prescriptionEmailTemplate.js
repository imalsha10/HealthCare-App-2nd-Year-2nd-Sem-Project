const prescriptionEmailTemplate = (fullName, totalAmount, date) => `
<!DOCTYPE html>
<html>
<head>
    <title>Prescription Notification</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .notification { color: #333366; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="notification">Prescription Notification for ${fullName}</h1>
        <p>Hi ${fullName},</p>
        <p>We're pleased to inform you that your drugs are ready for pickup.</p>
        <p>The total cost of the medicines in your prescription is: Rs.${totalAmount}.</p>
        <p>Please pick up your drugs from the pharmacy on:</p>
        <p>Date: ${date}</p>
        <br />
        <p>If you have any questions or need further assistance, feel free to reply to this email.</p>
        <p>Thank you for choosing our pharmacy!</p>
        <br />
        <p>Best regards,</p>
        <p>The Ratnam Hospital Team</p>
    </div>
</body>
</html>
`;

module.exports = prescriptionEmailTemplate;