import mongoose from "mongoose";

export const gameScheme = mongoose.Schema({
    userId: { ref: "Users", type: mongoose.Schema.Types.ObjectId, required: true },
    hiScore: { type: Number, required: true },
    difficulty: { type: String, required: true },
})

export const SNAKEGAME = mongoose.model("Snake Game", gameScheme);