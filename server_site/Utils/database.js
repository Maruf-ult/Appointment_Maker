import mongoose from "mongoose";

const dbCon = async () => {
  try {
    const dbURL = `${process.env.DB_URL}/Hospital`; 
    await mongoose.connect(dbURL);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  }
};

export default dbCon;