import themeContext from '../context/theme'
import {todoStateContext} from '../context/todoContext'
import {todoDispatcherContext} from '../context/todoContext'
import todoReducer from '../reducers/todoReducer';
import { useReducer, useState } from 'react';

export default function TodoProvider( { children }){
    const [state, dispatch] = useReducer (todoReducer, {
        theme: 'primary',
        todoList: []
      })
    return (
        <todoStateContext.Provider value={state}>
            <todoDispatcherContext.Provider value={dispatch}>
                <themeContext.Provider value={state.theme} >
                    { children }
                </themeContext.Provider>
            </todoDispatcherContext.Provider>
        </todoStateContext.Provider>
    )
}