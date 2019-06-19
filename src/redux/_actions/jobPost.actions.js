
function addPost(title) {
  return { type: "POST_ADD", title: title };
}

function addPostContent(content) {
  return { type: "POST_ADD", content: content };
}

const jobPostActions = {
  
  addPost: addPost
};

export default jobPostActions;
