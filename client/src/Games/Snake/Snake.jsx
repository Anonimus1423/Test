import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Button from '../Game_Components/Button';
import Restart from '../Game_Components/Restart';
import Scores from '../Game_Components/Scores';
import Settings from '../Game_Components/Settings';
import Title from '../Game_Components/Title';
import { SnakeGame, createCanvas } from './snakeScript.js'


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
	const [snake, setSnake] = useState()
	const [settings, setSettings] = useState(false)
	const [gameSettings, setGameSettings] = useState({ Difficulty: 1 })

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
		snake?.endGame();
		if(gameSettings.Difficulty === 1){
			setSnake(new SnakeGame(20, 20, 150, "#ffb114", "#F6C90E", 10, 2));
		}
		else if(gameSettings.Difficulty === 2)
		{
			setSnake(new SnakeGame(20, 20, 300, "#ffb114", "#F6C90E", 5, 1));
		}
		else
		{
			setSnake(new SnakeGame(20, 20, 500, "#ffb114", "#F6C90E", 2.5, 0.5));
		}
	}, [gameSettings])

  	return (
		<SnakeContainer>
			<Title>Snake Game</Title>
			<MainGame active={!settings}>
				<StyledSnakeGame>
					<Scores id="score">Your Score: 0</Scores>
					<Button onClick={() => setSettings(state => !state)}>Settings</Button>
				</StyledSnakeGame>
				<Canvas ref={element}>
					<Restart onClick={() => { snake.restart(); setSnake(new SnakeGame(20, 20, 200, "#F6C90E")) }}>Restart</Restart>
				</Canvas>
			</MainGame>
			<Settings gameSettings={gameSettings} setGameSettings={setGameSettings} setSettings={setSettings} gameAllSettings={gameAllSettings} active={settings} />
		</SnakeContainer>
  	)
}
