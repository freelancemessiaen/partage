import { useTodos } from "../context/todoContext";

export default function  Button( { text , className ,...props}) {
    const {theme} = useTodos();

    return <button {...props} className={`btn btn-${theme} ${className ? className : ''}`}>
    { text }</button>
}


