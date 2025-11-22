import mongoose from "mongoose";

export async function ConnectDB() {
    const { MONGODB_URI } = process.env;

    try {
        await mongoose.connect(MONGODB_URI); // no deprecated options
        console.log("Database connected successfully ☑");
    } catch (error) {
        console.error("Database failed to connect ✖", error.message);
    }
}
