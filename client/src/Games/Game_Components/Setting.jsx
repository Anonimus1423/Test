import React from 'react'
import styled from 'styled-components'
import Settings from './Settings'

const StyledSetting = styled.div` 
`

const Variants = styled.div` 
  display: flex;
  align-items: center;
`

const Variant = styled.button` 
  border: 2px solid ${({ theme }) => theme.colors.secondColor};
  padding: 6px 25px;
  border-radius: 7px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  outline: none !important;
  font-weight: 600;
  transition: 0.2s;
  margin-top: 15px;
  letter-spacing: 1px;
  &:hover
  {
    background-color: ${({ theme }) => theme.colors.secondColor};
    color: ${({ theme }) => theme.colors.secondTextColor};
  }
  &:last-child
  {
    margin-right: 0px;
  }
  ${({ active, theme }) => active ? `background-color: ${theme.colors.secondColor}; color: ${theme.colors.secondTextColor};` : null }
`

const Label = styled.p` 
  font-size: 18px;
  padding: 4px 0;
  display: inline-block;
  font-weight: 600;
  padding-left: 3px;
  border-left: 2px solid ${({ theme }) => theme.colors.secondColor};
`

export default function Setting({ setting, setGameSettings, gameSettings }) {

  const changeGameSettings = (type, value) => 
  {
    setGameSettings(state => ({...state, [type]: value}))
  }

  console.log(setting.label, Settings.value1, gameSettings[Settings.label]);
  return (
    <StyledSetting>
        <Label>{setting.label}</Label>
        <Variants>
            <Variant active={setting.value1 === gameSettings[setting.label]} onClick={() => changeGameSettings(setting.label, setting.value1)}>{setting.variant1}</Variant>
            <Variant active={setting.value2 === gameSettings[setting.label]} onClick={() => changeGameSettings(setting.label, setting.value2)}>{setting.variant2}</Variant>
            {setting.variant3 ? <Variant active={setting.value3 === gameSettings[setting.label]} onClick={() => changeGameSettings(setting.label, setting.value3)}>{setting.variant3}</Variant> : null}
            {setting.variant4 ? <Variant active={setting.value4 === gameSettings[setting.label]} onClick={() => changeGameSettings(setting.label, setting.value4)}>{setting.variant4}</Variant> : null}
            {setting.variant5 ? <Variant active={setting.value5 === gameSettings[setting.label]} onClick={() => changeGameSettings(setting.label, setting.value5)}>{setting.variant5}</Variant> : null}
        </Variants>
    </StyledSetting>
  )
}
