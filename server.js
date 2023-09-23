import { app } from "./app.js";
import connectDb from "./data/database.js";

connectDb()


app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});