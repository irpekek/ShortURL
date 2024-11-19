// @deno-types="@types/express"
import {Router} from "npm:express"
import shorturlRouter from "./shorturl.route.ts"
import { redirectToUrl } from "../controllers/shorturl.controller.ts";
import { urlLogger } from "../middlewares/urlLogger.middleware.ts";

const router = Router()

router.use("/shorten", shorturlRouter)
router.get("/:shortCode", urlLogger, redirectToUrl) 
export default router