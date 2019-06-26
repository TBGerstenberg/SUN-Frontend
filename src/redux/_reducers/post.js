let initialState = {
    posts: []
  };
  
  function posts(state = initialState, action) {
    if (action.type == "POST_ADD") {
      return [].concat(state, [action.post]);
    }
   
  
    return state;
  }
  
  function reduce(state = initialState, action) {
    return {
      posts: posts(state.posts, action)
    };
  }
  export default reduce;
  
  