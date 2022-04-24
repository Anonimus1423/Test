import axios from "axios"
import { changeOneSnakeScoreAction, changeSnakeScoresAction } from "../../Store/Reducers/gameReducer"

export const GameEnded = (result, setMessage, setError) => 
{
    return async dispatch => 
    {
        try
        {
            const res = await axios.post("/api/game/game-ended", {...result}, { headers: { Authorization: localStorage.getItem("token") }})
            if(res.status === 200)
            {
                if(res.data?.ok === false) {
                    return dispatch(changeOneSnakeScoreAction({hiScore: res.data.hiScore, difficulty: res.data.difficulty}));
                }
                dispatch(changeOneSnakeScoreAction({hiScore: res.data.hiScore, difficulty: res.data.difficulty}))
                setMessage(res.data.msg)
                setError(null)
            }
        }
        catch(e)
        {
            console.log(e);
            setError(e?.data?.error);
        }
    }
}