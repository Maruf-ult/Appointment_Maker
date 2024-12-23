import mongoose from "mongoose";

const dbCon = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default dbCon;
