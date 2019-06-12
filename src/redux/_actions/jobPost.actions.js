function incrementCounter() {
  return { type: "INCREMENT" };
}

function addTodo(title) {
  return { type: "TODO_ADD", title: title };
}

const jobPostActions = {
  incrementCounter: incrementCounter,
  addTodo: addTodo
};

export default jobPostActions;
