import React from 'react';
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from '../constants/style.js';
import { ReactComponent as Add } from './public/images/add.svg';

const IconAdd = styled(Add)`
  width: 35px;
  cursor: pointer;
`

const TodoInput = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

const TodoInputText = styled.input`
  border-style: none none solid none;
  background-color: transparent;
  padding: 5px 15px 5px 5px;
  font-size: 18px;
`

export default function TodoInputBlock(handleButtonClick) {
  return (
    <TodoInput>
      <TodoInputText />
      <IconAdd onClick={handleButtonClick} />
    </TodoInput>
  )
}
