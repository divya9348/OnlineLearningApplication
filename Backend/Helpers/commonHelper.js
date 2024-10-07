const bycrypt=require('bcrypt');

const hashedPassword=async (Password)=>{
    const saltround=10;
    return await bycrypt.hash(Password, saltround);
};

const comparePassword=async(enteredPassword, storedPassword)=>{
    return await bycrypt.compare(enteredPassword, storedPassword);
}

module.exports={hashedPassword, comparePassword};