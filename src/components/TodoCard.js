import React from 'react';
import styled from "styled-components";
import { MEDIA_QUERY_MD } from '../constants/style.js';
import { ReactComponent as Unchecked } from '../public/images/unchecked.svg';
import { ReactComponent as Checked } from '../public/images/checked.svg';
import { ReactComponent as Edit } from '../public/images/edit.svg';
import { ReactComponent as Delete } from '../public/images/delete.svg';


const TodoText = styled.span`
  font-size: 18px;
  align-text: center;
  ${props => props.$isDone && `
    text-decoration: line-through;
    color: grey;
    text-decoration-thickness: 2px;
    `
  }
`
const IconUnchecked = styled(Unchecked)`
  width: 35px;
  cursor: pointer;
`
const IconEdit = styled(Edit)`
  width: 35px;
  cursor: pointer;
`

const IconDelete = styled(Delete)`
  width: 35px;
  cursor: pointer;
`
const IconChecked = styled(Checked)`
  width: 35px;
  cursor: pointer;
`

const TodoButtonWrapper = styled.div`
  display:flex;
  align-items: center;
`
const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 3px 3px 8px 0px #a3a3a3;
  background: #a1d4e2;
  border-radius: 15px;
  padding: 10px;
  margin: 18px 0;
  position: relative;
  opacity: 90%;
  color: #00416d;
  
  & + & {
    margin-top: 18px;
  }

  &: hover {
    opacity: 1;
    box-shadow: 4px 4px 5px 0px #787676;
  }
  ${MEDIA_QUERY_MD} {
    width: 84%;
    margin: 0 auto;
  }

  ${props => props.$isDone && `
    opacity: 85%
  `
  }}
`
const TodoContent = styled.div`
  display: flex;
  align-items: center;
  width: 86%;
  color: #00416D;
`

export default function TodoCard({ todo, handleDeleteTodo, handleToggleIsDone }) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id)
  }
  return (
    <TodoItem data-todo-id={todo.id} $isDone={todo.isDone}>
      <TodoContent onClick={handleToggleClick}>
        {todo.isDone ? <IconChecked /> : <IconUnchecked />}
        <TodoText $isDone={todo.isDone}>{todo.content}</TodoText>
      </TodoContent>
      <TodoButtonWrapper>
        <IconDelete onClick={handleDeleteClick} />
      </TodoButtonWrapper>
    </TodoItem>
  )
}
