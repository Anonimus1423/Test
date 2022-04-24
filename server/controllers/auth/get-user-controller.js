import getUserScores from "../../helper/game/get-user-scores.js";
import getNotification from "../../helper/notifications/getNotification.js";

export default async function getUserController(req, res) 
{
    try
    {
        const { user } = req;
        const notifications = await getNotification(user._id) 
        const scores = await getUserScores(user._id)
        console.log(scores);
        return res.json({ 
            user: { email: user.email, username: user.username, nickname: user.nickname, verified: user.verified, level: user.level}, 
            notifications: notifications,
            scores: scores
        })
    }
    catch(e)
    {
        res.status(400).send(e.data)
    }
}
