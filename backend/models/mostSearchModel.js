import mongoose from "mongoose";

const mostSearchSchema = mongoose.Schema(
  {
    search: { type: String, default: 0 },
  },
  {
    timestamps: true,
  }
);
const MostSearch = mongoose.model("MostSearch", mostSearchSchema);

export default MostSearch;
