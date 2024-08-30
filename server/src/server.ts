import "core-js";
import { port } from "./config";
import app from "./app";

app
  .listen(port, () => {
    console.info(`Server running on port : ${port} ⚡️`);
  })
  .on("error", (e: unknown) => console.error(e));
