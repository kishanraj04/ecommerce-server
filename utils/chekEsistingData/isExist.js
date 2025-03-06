import mongoose from "mongoose";

export const isExist = (data, id) => {
   const value = data.some((item) => item?._id.toString()=="67c91a95ddbc93daa3941759");
   return value
};
