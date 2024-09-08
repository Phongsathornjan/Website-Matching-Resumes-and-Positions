const nodemailer = require('nodemailer');

const sendOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: 'Not found both Parameter'
            });
        }

        // สร้าง transporter ที่จะใช้งานกับบริการส่งอีเมล (ใช้ App Password)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test.resumeunion@gmail.com', // อีเมลของคุณ
                pass: 'srie pwxd wjab ouwp'   // ใช้ App Password ที่สร้างจาก Google
            }
        });

        // ตั้งค่าอีเมล
        let mailOptions = {
            from: 'test.resume@gmail.com', // ผู้ส่ง
            to: email, // ผู้รับ
            subject: 'Resume Union',
            text: 'Hello! This is a OTP for ResumeUnion.com',
            html: `<b>Your OTP is</b> ${otp}`
        };

        // ส่งอีเมล
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: 'Error to sending email'
                });
            } else {
                return res.status(200).json({
                    message: 'Success'
                });
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = sendOTP;
