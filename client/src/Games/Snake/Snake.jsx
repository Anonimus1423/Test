import React, { useEffect, useRef, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameEnded } from '../gameHttp/useGameHttp';
import Button from '../Game_Components/Button';
import Restart from '../Game_Components/Restart';
import Scores from '../Game_Components/Scores';
import Settings from '../Game_Components/Settings';
import Title from '../Game_Components/Title';
import { SnakeGame, createCanvas } from './snakeScript.js'
import { NotificationContext } from "../../Hooks/Alert/NotificationProvider";


const StyledSnakeGame = styled.div`
	line-height: 1;
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	font-weight: 600;
	align-items: center;
	margin-bottom: 10px;
`
const SnakeContainer = styled.div`
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	display: inline-block;
`
const Canvas = styled.div` 
	position: relative;
	overflow: hidden;
`
const MainGame = styled.div`
	position: relative;
	transition: 0.5s;
	${({ active }) => !active ? "transform: translateY(50%); opacity: 0" : null}
`

const gameAllSettings = [
	{
		label: "Difficulty",
		variant1: "Easy",
		variant2: "Medium",
		variant3: "Hard",
		value1: 1,
		value2: 2,
		value3: 3,
	},
]

export default function Snake() {

	const element = useRef();
	const dispatch = useDispatch();
	const [snake, setSnake] = useState()
	const [game, setGame] = useState({
		gameOver: false,
		score: 0,
		type: "snake",
		difficulty: ""
	})
	const [settings, setSettings] = useState(false)
	const [gameSettings, setGameSettings] = useState({ Difficulty: Number(localStorage.getItem("snake_difficulty")) || 1 })
    const [message, setMessage] = useState();
    const [error, setError] = useState();
	const scores = useSelector(state => state?.game?.snakeGame?.scores.find(score => score.difficulty === game.difficulty)?.hiScore);

    const alerter = useContext(NotificationContext)

    useEffect(() => 
    {
        if(error)
        {
            alerter("error", error)
			setError(null)
        }
        if(message)
        {
            alerter("message", message)
			setMessage(null)
        }
    }, [message, error])

	useEffect(() => 
	{
		createCanvas(500, 500, "#303841", element);
	}, [])
	useEffect(() => 
	{
		snake?.start();
	}, [snake])

	useEffect(() => 
	{
		if(game.gameOver === true && (!scores || Number(game.score) > Number(scores)))
		{
			dispatch(GameEnded({ ...game }, setMessage, setError))
			setGame(state => ({ ...state, gameOver: false }))
		}
	}, [game])

	const setSnakeFunction = () => 
	{
		snake?.endGame();
		localStorage.setItem("snake_difficulty", gameSettings.Difficulty)
		if(gameSettings.Difficulty === 1){
			setSnake(new SnakeGame(20, 20, 150, "#ffb114", "#F6C90E", 10, 1, 20, setGame, "Easy"));
		}
		else if(gameSettings.Difficulty === 2)
		{
			setSnake(new SnakeGame(20, 20, 300, "#ffb114", "#F6C90E", 5, 0.5, 15, setGame, "Medium"));
		}
		else
		{
			setSnake(new SnakeGame(20, 20, 500, "#ffb114", "#F6C90E", 2.5, 0.25, 25, setGame, "Hard"));
		}
	}

	useEffect(() => 
	{
		setSnakeFunction()
	}, [gameSettings])

	const RestartGame = () => 
	{
		snake.restart(); 
		setSnakeFunction()
	}
  	return (
		<SnakeContainer>
			<Title>Snake Game</Title>
			<MainGame active={!settings}>
				<StyledSnakeGame>
					<Scores id="score">Your Score: 0</Scores>
					<Button onClick={() => setSettings(state => !state)}>Settings</Button>
				</StyledSnakeGame>
				<Canvas ref={element}>
					<Restart difficulty={game.difficulty} onClick={RestartGame}>Restart</Restart>
				</Canvas>
			</MainGame>
			<Settings gameSettings={gameSettings} setGameSettings={setGameSettings} setSettings={setSettings} gameAllSettings={gameAllSettings} active={settings} />
		</SnakeContainer>
  	)
}
