import mongoose from "mongoose";


const usersSchema =  new mongoose.Schema(
  {
    firstNamn: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    }, 
    lastNamn: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      lowercase: true,
      min: 6,
    },
    picture:{
      type:String,
      default:""
    },
    // likedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],

  
  }
  );

  export default mongoose.model("User", usersSchema);

  