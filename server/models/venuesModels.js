import mongoose from "mongoose";


const VenuesSchema =  new mongoose.Schema(
  {
    venuesNamn: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    }, 
    description: {
      type: String,
    },
    venuesStreet: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
   
    venuesLocation: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    price:{
      type:Numner,
      default:""
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


  }
  );

  const Venuses = mongoose.model("Venuses", VenuesSchema);
  export default Venuses;