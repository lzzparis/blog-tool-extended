var React = require("react");

var EmptyPost = function(){
  return {
    _id: null,
    subject: "",
    body: "",
    img: "",
    timestamp: new Date()
  };
};

var initialState = {
  formData: new EmptyPost(),
  displayPost:{},
  posts:{}
};

var actions = require("../actions/actions");

var reducer = function(state, action){
  state = state || initialState;
  switch(action.type){
    case actions.RESET_FORM:
      return Object.assign({}, state, {formData: initialState.formData});
    case actions.FETCH_ALL_POSTS_SUCCESS:
      return Object.assign({}, state, {posts: action.posts});
    case actions.FETCH_FULL_POST_DISPLAY:
      return Object.assign( {}, state, {displayPost: action.post}); 
    case actions.FETCH_FULL_POST_EDIT:
      return Object.assign( {}, state, {formData: action.post}); 
    default: 
      return state;
  }
}

module.exports = reducer;