const defaultState = 
{
    snakeGame: 
    {
        scores: [
            { 
                difficulty: "Easy",
                hiScore: 0
            },
            { 
                difficulty: "Medium",
                hiScore: 0
            },
            { 
                difficulty: "Hard",
                hiScore: 0
            },
        ]
    }
}

const changeSnakeScores = "changeSnakeScores"
const changeOneSnakeScore = "changeOneSnakeScore"

export default function gameReducer(state = defaultState, action)
{
    switch(action.type)
    {
        case changeSnakeScores:
            return {
                ...state, 
                snakeGame: { ...state.snakeGame, scores: [ ...action.payload.scores ] }
            }
        case changeOneSnakeScore:
            return {
                ...state, 
                snakeGame: { ...state.snakeGame, scores: [ 
                    ...state.snakeGame.scores.map(score => 
                    {
                        if(score.difficulty === action.payload.score.difficulty)
                        {
                            return action.payload.score;
                        }
                        return score;
                    }) 
                ] }
            }
        default: return state;
    }
}

export const changeSnakeScoresAction = scores => ({ type: changeSnakeScores, payload: {scores}})
export const changeOneSnakeScoreAction = score => ({ type: changeOneSnakeScore, payload: {score}})