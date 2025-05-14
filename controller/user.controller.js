import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { generateAndSaveToken } from "../utils/tokens/generateAndSaveToken.js";
import { hashPassword } from "../utils/password/createHash.js";

// register user
export const signUpUser = asyncHandler(async (req, res) => {
  const isExistUser = await userModel.findOne({
    $or: [{ email: req?.body?.email, contact: req?.body?.contact }],
  });

  if (isExistUser) {
    return res.status(200).json({ success: false, message: "user Exist" });
  }

  const createdUser = await userModel.create(req?.body);
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
  // console.log(oldPassword, newPassword, confirmPassword);
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
  const hash = await hashPassword(newPassword);
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
    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      updatedUser,
    });
  }
});

// get all users --admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await userModel.find({});
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
      return res.status(200).json({
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

// delete a user --admin
export const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const deletedUser = await userModel.deleteOne({ _id: uid });
  if (deletedUser.deletedCount >= 1) {
    return res
      .status(200)
      .json({ success: true, message: "user deleted success", deletedUser });
  } else {
    return res
      .status(204)
      .json({ success: false, message: "user not deleted" });
  }
});

// update user --admin
export const updateUserData = asyncHandler(async (req, res) => {
  const data = req?.body;

  const updatedUser = await userModel.findByIdAndUpdate(
    data?._id,
    { $set: data },
    { new: true }
  );

  if (!updateUserData) {
    return res.status(404).json({ sucess: false, message: "update failed" });
  } else {
    res
      .status(200)
      .json({ success: true, message: "user updated", updatedUser });
  }
});

// get signup user in this week
export const getUserThisWeek = asyncHandler(async (req, res) => {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7); // Next Sunday

  try {
    const count = await userModel.countDocuments({
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });

    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// get register user today
export const getTodayRegisterUser = asyncHandler(async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const count = await userModel.countDocuments({
    createdAt: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  });

  res.json({ registeredToday: count });
});
