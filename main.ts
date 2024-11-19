// @deno-types="npm:@types/express"
import express from "npm:express"
import { connectDB } from "./configs/db.ts";
import indexRoutes from "./routes/index.route.ts"
const app = express()

try {
  await connectDB()
} catch (error) {
  console.log(error)
  Deno.exit(1)
}

app.use(express.json())
app.use("/", indexRoutes)

app.listen(5000, () => {
  console.log("Running on Port 5000")
})