import mongoose, { ConnectOptions } from "mongoose";
import { db, Environment, environment as _environment } from "../config";

const dbPortStr = db.port ? `:${db.port}` : "";

// Build the connection string
const environment = ((_environment as string) || "development")
  .toLowerCase()
  .trim() as Environment;
const dbURIMap: Record<Environment, string> = {
  production: `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${
    db.host
  }${dbPortStr}/${db.name}`,
  development: "mongodb://127.0.0.1:27017/my_db_dev",
  test: "mongodb://localhost:27017/my_db_test"
};
const dbURI = dbURIMap[environment];

const options: ConnectOptions = {
  autoIndex: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.info("Mongoose connection done");
  })
  .catch(e => {
    console.info("Mongoose connection error");
    console.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
