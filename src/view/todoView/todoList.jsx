import React from 'react';

import { connect } from 'library/react-redux/react-redux_v16';

import { todoAction } from 'store/action';

function filterTodoList(todoList, filter) {
    let newTodoList;
    if (filter === 'done') {
        newTodoList = todoList.filter(item => item.isFinish);
    } else if (filter === 'undone') {
        newTodoList = todoList.filter(item => !item.isFinish);
    } else {
        newTodoList = todoList;
    }
    return newTodoList
}

const mapState = state => {
    return {
        todoList: filterTodoList(state.todo, state.filter)
    }
}

const mapDispatch = dispatch => {
    return {
        removeList: index => {
            dispatch(todoAction.reomveAction(index))
        },
        toggleList: index => {
            dispatch(todoAction.toggleAction(index))
        }
    }
}

function TodoList({todoList, removeList, toggleList}) {
    return (
        <ul>
            {
                todoList.map((item, index) => {
                    return (
                        <li key={index}>
                            <span onClick={() => toggleList(index)}>
                                {
                                    item.isFinish ? 
                                        <s>{item.text}</s> : <span>{item.text}</span>
                                }
                            </span>
                            <button onClick={() => removeList(index)}>×</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default connect(mapState, mapDispatch)(TodoList);
