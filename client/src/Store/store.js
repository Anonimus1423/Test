import { applyMiddleware, combineReducers, createStore } from "redux"
import userReducer from "./Reducers/userReducer"
import notificationReducer from "./Reducers/notificationReducer"
import thunk from "redux-thunk"
import gameReducer from "./Reducers/gameReducer"

const rootReducer = combineReducers({
    user: userReducer, 
    notifications: notificationReducer,
    game: gameReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))