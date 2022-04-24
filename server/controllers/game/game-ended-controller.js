import { SNAKEGAME } from "../../models/snake-game-model.js";

export default async function gameEndedController(req, res) 
{       
    try
    {
        const { score, difficulty } = req.body;
        const user = req.user;

        let game = await SNAKEGAME.findOne({ userId: user._id, difficulty })
        if(game){
            if(Number(game.hiScore) < Number(score)){
                game.hiScore = score;
            }
            else
            {
                return res.status(200).json({ msg: "Date Don't Updated.", ok: false, hiScore: game.hiScore, difficulty: game.difficulty });
            }
        }
        else
        {   
            game = new SNAKEGAME({ userId: user._id, hiScore: score, difficulty })
        }

        await game.save();
        return res.status(200).json({ msg: "Date Updated.", ok: true, hiScore: game.hiScore, difficulty: game.difficulty });
    }
    catch(e)
    {
        res.status(400).send(e.data)
        console.log(e);
    }
}