import { SNAKEGAME } from "../../models/snake-game-model.js";

export default async function getUserScores(userId)
{
    return await SNAKEGAME.find({ userId })
}