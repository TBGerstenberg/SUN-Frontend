function addPost(post) {
  return { type: "POST_ADD", post:post };
}




const jobPostActions = {
  
  addPost: addPost,
  
};

export default jobPostActions;

