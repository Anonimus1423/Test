import React from 'react'
import styled from 'styled-components'
import Setting from './Setting'
import { v4 } from "uuid"
import { RightCard } from '../../Components/Main_Page/Main_Page_Components/Right_Components/Statistics'

const StyledSettings = styled(RightCard)` 
    position: absolute;
    left: 50%;
    top: 120px;
    width: 100%;
    transition: 0.5s;
    pointer-events: auto;
    padding: 30px 30px;
    transform: translateX(-50%);
    ${({ active }) => !active ? "transform: translateY(-50%) translateX(-50%); opacity: 0; pointer-events: none;" : null}
`

const SubTitle = styled.h3` 
    text-align: center; 
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const GoBack = styled.p` 
    margin-top: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.secondColor};
    &:hover
    {
        font-weight: 600;
    }
`

export default function Settings({ gameAllSettings, active, setSettings, setGameSettings, gameSettings }) {
    return (
        <StyledSettings active={active}>
            <SubTitle>Settings<GoBack onClick={() => setSettings(false)}>go back</GoBack></SubTitle>
            {
                gameAllSettings.map(setting => <Setting gameSettings={gameSettings} setGameSettings={setGameSettings} key={v4()} setting={setting} />)
            }
        </StyledSettings>
    )
}
