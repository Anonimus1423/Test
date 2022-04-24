import { Router } from "express";
import gameEndedController from "../controllers/game/game-ended-controller.js";
import getUserMiddleware from "../middlewares/get-user-middleware.js";

const gameRouter = Router();

gameRouter.post(
    "/game-ended", 
    getUserMiddleware,
    gameEndedController
)

export default gameRouter;