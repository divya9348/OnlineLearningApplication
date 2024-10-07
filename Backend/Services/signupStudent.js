const studentData=require('../Models/studentDataSchema');
const commonHelper=require('../Helpers/commonHelper');
const transporter = require('../emailSetup/mailSetup');



async function createStudent(studentDetails) {

    const hashedPassword=await commonHelper.hashedPassword(studentDetails.Password);
    const student=new studentData({...studentDetails, Password:hashedPassword});

    const studentExist= await studentData.findOne({
        $or:[
            {Email:student.Email}
        ]
    });

    if(studentExist){
        return{success:false, message:"User Already Exist"};
    }
    await student.save();
    return {success:true, message:"Created Successfully"};
};


async function contactUs(contactDetails){

    const userData = await studentData.findOne({ });
    
    const { fullname, email, message } = contactDetails;

    // Email options to send
    const mailOptions = {
        from: email, // sender address from the .env
        to: 'divyaranjanbehera397@gmail.com', // recipient email (you can change this to your organization's email)
        subject: `Contact Request from ${fullname}`, // email subject
        text: `Full Name: ${fullname}\nEmail: ${email}\nMessage: ${message}` // email content
    };

    // Send email using the transporter
    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Message sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send message' };
    }

}
module.exports={createStudent, contactUs};