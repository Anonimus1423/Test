import React from 'react'
import styled from 'styled-components'
import { MyButton } from './Button'
import { useSelector } from 'react-redux'

const StyledRestart = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondColor}22;
    transform: translate(-50%, -100%);
    transition: 0.4s;
    &.active
    {
        top: 50%;
        transform: translate(-50%, -50%);
    }
`
const RestartBody = styled.div`
    background-color: ${({ theme }) => theme.colors.defaultColor};
    padding: 15px 30px;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.secondColor};
`
const RestartButton = styled(MyButton)` 
    font-size: 17px;
    padding: 10px 25px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &:hover:before
    {
        width: 120px;
        height: 120px;
    }
`
const Record = styled.h4` 
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 22px;
    text-align: center;
    margin-bottom: 15px;
`
export default function Restart({ children, onClick, difficulty }) 
{
    const score = useSelector(state => state?.game?.snakeGame?.scores.find(score => score.difficulty === difficulty)?.hiScore)
    return (
        <StyledRestart className='restart'>
            <RestartBody>
                <Record>Best score: {score}</Record>
                <RestartButton onClick={onClick}>{children}</RestartButton>
            </RestartBody>
        </StyledRestart>
    )
}
