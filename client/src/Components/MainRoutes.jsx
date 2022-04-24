import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import MainPage from './Main_Page/MainPage.jsx'
import Header from './Global_Components/Header/Header.jsx'
import SideBar from './Global_Components/SideBar/SideBar.jsx'
import Form from './Form/Form.jsx'
import { useSelector } from 'react-redux'
import MainLoading from './Loading/MainLoading.jsx'
import Snake from '../Games/Snake/Snake.jsx'

const goRight = keyframes` 
    from
    {
        transform: translateX(100%);
        opacity: 1;
    }
    to
    {
        opacity: 0.25;
        transform: translateX(201%);
    }
`
const goLeft = keyframes` 
    from
    {
        transform: translateX(0%);
        opacity: 1;
    }
    to
    {
        opacity: 0.25;
        transform: translateX(-101%);
    }
`
const goTop = keyframes` 
    from
    {
        transform: translateY(101%);
        opacity: 1;
    }
    to
    {
        opacity: 0.25;
        transform: translateY(201%);
    }
`
const goBottom = keyframes` 
    from
    {
        transform: translateY(0%);
        opacity: 1;
    }
    to
    {
        opacity: 0.25;
        transform: translateY(-101%);
    }
`
const RightSide = styled.div`
    width: 100% !important;
    display: inline-block;
`

const StyledMainRoutes = styled.div` 
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    &:before, &:after
    {
        content: "";
        position: absolute;
        left: 0;
        top: 0px;
        transform: translateX(0%);
        z-index: 10;
        width: 50vw;
        opacity: 1;
        height: 100vh;
        background-color:${({ theme }) => theme.colors.backgroundColor} ;
        animation: ${goRight} 0.8s forwards;
        border-left: 5px solid ${({ theme }) => theme.colors.secondColor};
    }
    &:before
    {
        animation: ${goLeft} 0.8s forwards;
        border-right: 5px solid ${({ theme }) => theme.colors.secondColor};
        transform: translateX(100%);
    }
`
const StartMainRoutes = styled.div` 
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    &:before, &:after
    {
        content: "";
        position: absolute;
        left: 0;
        opacity: 1;
        top: 0px;
        transform: translateY(0%);
        z-index: 10;
        width: 100vw;
        height: 50vh;
        background-color:${({ theme }) => theme.colors.backgroundColor} ;
        animation: ${goBottom} 0.8s forwards;
        border-bottom: 5px solid ${({ theme }) => theme.colors.secondColor};
    }
    &:before
    {
        animation: ${goTop} 0.8s forwards;
        border-top: 5px solid ${({ theme }) => theme.colors.secondColor};
        transform: translateY(100%);
    }
`

export default function MainRoutes() 
{
    const {authored, verified} = useSelector(state => state.user)
    if(authored !== undefined)
    {
        return (
            <BrowserRouter>
                <StyledMainRoutes>
                    <StartMainRoutes />
                    <SideBar />
                    <RightSide>
                        <Header />
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            {
                                authored
                                ?
                                    <>
                                        <Route path='/account/verification' element={<Form login={false} verification={true} verified={verified} />} />
                                        <Route path='/games/snake-game' element={<Snake />} />
                                    </>
                                :
                                <>
                                    <Route path='/account/registration' element={<Form login={false} />} />
                                    <Route path='/account/log-in' element={<Form login={true} />} />
                                </>
                            }
                        </Routes>
                    </RightSide>
                </StyledMainRoutes>
            </BrowserRouter>
        )
    }
    return <MainLoading />
}
