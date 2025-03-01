import mongoose from "mongoose";

const connectDatabase = async () => {
  const mongoURI: string | undefined = process.env.MONGO_URI;
  const dbName: string | undefined = process.env.DB_NAME;
  if (!mongoURI || !dbName) {
    throw new Error("MONGO_URI or DB_NAME is not defined");
  }
  await mongoose.connect(mongoURI, { dbName: dbName });
  console.log(`Connected to ${dbName} db`);
};

const dropDatabase = async () => {
  await mongoose.connection.dropDatabase();
  console.log(`Dropped ${process.env.DB_NAME} db`);
};

const dropCollection = async (collectionName: string) => {
  await mongoose.connection.dropCollection(collectionName);
  console.log(`Dropped ${collectionName} collection`);
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
  console.log(`Disconnected from ${process.env.DB_NAME} db`);
};

export { connectDatabase, dropDatabase, dropCollection, disconnectDatabase };
