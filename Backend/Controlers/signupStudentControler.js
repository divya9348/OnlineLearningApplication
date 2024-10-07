const {createStudent, contactUs}=require('../Services/signupStudent');

const createStudentControler= async (req, res)=>{
    try{
        const result=await createStudent(req.body);
      

        if(result){
            res.status(201).json({message:result.message});
        }else{
            res.status(400).json({message:result.message});
        }
    }
    catch(error){
        res.status(500).json({message:'server error..', error})
        console.log(error);
    }
}


// Create contactUs controller
const contactUsController = async (req, res) => {
    try {
        const contactDetails = req.body; // Expecting fullname, email, and message in the request body
        const result = await contactUs(contactDetails);

        if (result.success) {
            return res.status(200).json({ message: result.message });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error in contactUsController:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports={createStudentControler, contactUsController};