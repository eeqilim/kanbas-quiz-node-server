import mongoose from "mongoose";
import questionSchema from "./schema.js";

const questionModel = mongoose.model("QuestionModel", questionSchema);
export default questionModel;