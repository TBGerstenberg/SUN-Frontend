
let initialState = {
    counter: 0,
    todos: [
        {id: 5, title: "Hallo Welt"},
        {id: 10, title: "Hallo Welt 2"}
    ]
};

function counter(state, action) {
    if(action.type == "INCREMENT") {
        return state +1;
    } else {
        return state;
    }
}

function todos(state = initialState, action){
if(action.type == "TODO_ADD"){
    let maxTodoId = 0;
    for(let todo of state){
        if(todo.id > maxTodoId) {
            maxTodoId = todo.id;
        }
    }
    return [].concat(state, [
        {id:maxTodoId + 1, title: action.title}
    ])
}

    return state;
}

function reduce(state = initialState, action){
    return{
counter: counter(state.counter, action),
todos: todos(state.todos, action)
}
}
export default reduce;