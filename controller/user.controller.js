import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { generateAndSaveToken } from "../utils/tokens/generateAndSaveToken.js";
import { hashPassword } from "../utils/password/createHash.js";

// register user
export const signUpUser = asyncHandler(async (req, res) => {

  const isExistUser = await userModel.findOne({$or:[{email:req?.body?.email,contact:req?.body?.contact}]})


  console.log(isExistUser);

  if(isExistUser){
    return res.status(200).json({success:false,message:"user Exist"})
  }

  const createdUser = await userModel.create(req?.body);
  console.log("CU ",createdUser);
  res.status(200).json({
    sucess: true,
    message: "user created sucess",
    createdUser,
  });
});

// get my profile
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await req.user;
  return res.status(200).json({ success: true, message: "user found", user });
});

// update password
export const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req?.body;
  console.log(oldPassword, newPassword, confirmPassword);
  if (newPassword != confirmPassword) {
    return res
      .status(200)
      .json({ success: false, message: "invalid password" });
  }

  const { _id } = req?.user;
  const user = await userModel.findOne({ _id }).select("+password");

  const isCorrect = await bcrypt.compare(`${oldPassword}`, `${user.password}`);

  if (!isCorrect) {
    return res
      .status(401)
      .json({ success: false, message: "invalid password" });
  }
  console.log(isCorrect);
  const hash = await hashPassword(newPassword);
  console.log(hash);
  const updateUser = await userModel.findByIdAndUpdate(_id, {
    $set: { password: hash },
  });
});

// update profile --admin
export const updateMyProfile = asyncHandler(async (req, res) => {
  const tempPass = (req?.user).password;
  const { _id } = req?.user;
  const updatedProfileData = req?.body;

  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    { $set: { password: tempPass, ...updatedProfileData } },
    { new: true }
  );

  if (updatedUser) {
    return res
      .status(200)
      .json({
        success: true,
        message: "user updated successfully",
        updatedUser,
      });
  }
});

// get all users --admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await userModel.find({ role: "user" });
  if (!allUsers) {
    return res.status(404).json({ success: false, message: "users not found" });
  } else {
    res.status(200).json({ success: true, message: "users found", allUsers });
  }
});

// get single user --admin
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const singleUser = await userModel.findOne({ _id: id });
  if (!singleUser) {
    return res.status(404).json({ success: false, message: "user not found" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "user found", singleUser });
  }
});

// change role for the user --admin
export const changeUserRole = asyncHandler(async (req, res) => {
  const { email, newRole } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return res.status(404).json({ success: false, message: "user not found" });
  } else {
    const updateData = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { role: newRole } },
      { new: true }
    );

    if (updateData) {
      return res
        .status(200)
        .json({
          success: true,
          message: "user update successfully",
          updateData,
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "user updated false" });
    }
  }
});

// delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const deletedUser = await userModel.deleteOne({ email: email });
  if(deletedUser.deletedCount>=1)
  {
    
    return res.status(200).json({success:true,message:"user deleted success",deletedUser})
  }else
  {

    return res.status(204).json({success:false,message:"user not deleted"})
  }
});
