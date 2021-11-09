import './App.css';
import { useState, useRef, useMemo, useCallback } from 'react';
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from './constants/style.js';
import TodoCard from './components/TodoCard.js';
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

const TodoTitle = styled.h1`
  color: #26c6da;
  text-align: center;
`

const TodoCards = styled.div`
  padding: 10px;
`
const TodoWrapper = styled.div`
  width: 75%;
  margin: 20px auto;
  background: #e3f8fa;
  border-radius: 25px;
  padding: 20px 60px;
  box-sizing: border-box;
  box-shadow: 5px 7px 16px #dad4d4;

  ${MEDIA_QUERY_MD} {
    width: 95%;
    padding: 10px 0;
  }
`

const TodoSelectors = styled.div`
  ${MEDIA_QUERY_MD} {
    display: flex;
    margin: 0 auto;
    justify-content: center;
  }
`
const TodoSelector = styled.div`
  display: inline-box;
  justify-content: space-between;
  text-align: center;
  background: #abdae6;
  &:first-child {
    border-radius: 15px 0 0 15px;
  }
  &:last-child {
    border-radius: 0 15px 15px 0;
  }
  
  :hover {
    color: #e3f8fa;
    background: #00416d;
  }
  cursor: pointer;
  color: #1a5980;
  padding: 10px;
  margin: 18px 0;
  font-size: 18px;
  position: relative; 
  ${MEDIA_QUERY_MD} {
    padding: 15px 10px;
    font-size: 16px;
    margin:0
  }
`
let id = 2;
function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: 'abc', isDone: true },
    { id: 2, content: 'not done', isDone: false }
  ]);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('all');
  const filterTodos = useMemo(() => {
    console.log('calculate todos');
    return todos.filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'active') {
        return !todo.isDone;
      }
      if (filter === 'completed') {
        if (todo.isDone) return true;
        return false;
      }
    })
  }, [todos, filter])
  console.log('rerender')
  const id = useRef(3)
  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value
      },
      ...todos
    ])
    setValue('')
    id.current++
  }

  const handleInputChange = e => {
    console.log(todos)
    setValue(e.target.value)
  };

  // function handleDeleteTodo() {
  const handleDeleteTodo = id => {
    // todos.filter(todo => todo.id != id) // 卡住：沒有 setTodos 改變狀態！！！
    // console.log(id) // 卡住：undefined 因為在使用 func 時，沒有寫參數 todo.id 傳入 func
    setTodos(todos.filter(todo => todo.id !== id))
    // console.log(todos.filter(todo => todo.id !== id))
  }

  const handleToggleIsDone = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  return (
    <div className="App">
      <TodoWrapper>
        <TodoTitle>Todo List</TodoTitle>
        <TodoInput>
          <TodoInputText type='text' placeholder='new todo' value={value} onChange={handleInputChange} />
          <IconAdd onClick={handleButtonClick} />
        </TodoInput>
        <TodoSelectors>
          <TodoSelector onClick={() => setFilter('all')}>All</TodoSelector>
          <TodoSelector onClick={() => setFilter('completed')}>Complete</TodoSelector>
          <TodoSelector onClick={() => setFilter('active')}>Incomplete</TodoSelector>
        </TodoSelectors>
        <TodoCards>
          {
            filterTodos.map(todo => <TodoCard key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)
          }
        </TodoCards>
      </TodoWrapper>
    </div>
  );
}

export default App;