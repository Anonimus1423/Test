import React from 'react'
import styled, { keyframes } from 'styled-components'


const rotate = keyframes
` 
    0% 
    {
      transform: rotate(0deg);
    }
    100% 
    {
      transform: rotate(360deg);
    }
`


const Loading = styled.div`
    display: inline-block;
    position: relative;
    left: 50%;
    top: 50vh;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    & div 
    {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid ${({ theme }) => theme.colors.secondColor};
        border-radius: 50%;
        animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${({ theme }) => theme.colors.secondColor} transparent transparent transparent;
        &:nth-child(1) 
        {
          animation-delay: -0.45s;
        }
        &:nth-child(2) 
        {
          animation-delay: -0.3s;
        }
        &:nth-child(3) 
        {
          animation-delay: -0.15s;
        }
    }
`

export default function MainLoading() {
  return (
    <Loading>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </Loading>
  )
}
