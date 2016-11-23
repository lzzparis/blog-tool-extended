var fetch = require("isomorphic-fetch");
var router = require("react-router");
var hashHistory = router.hashHistory; 


var INIT_USER_SUCCESS = "INIT_USER_SUCCESS";
var initUserSuccess = function() {
  return {
    type: INIT_USER_SUCCESS
  }
};

var FETCH_USER_STATUS_SUCCESS = "FETCH_USER_STATUS_SUCCESS";
var fetchUserStatusSuccess = function(value){
  return {
    type: FETCH_USER_STATUS_SUCCESS,
    value: value
  }
};
var FETCH_USER_STATUS_ERROR = "FETCH_USER_STATUS_ERROR";
var fetchUserStatusError = function(){
  return {
    type: FETCH_USER_STATUS_ERROR
  }
};

var fetchUserStatus = function(){
  return function(dispatch) {
    var url = "/user";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method:"GET", headers: headers})
    .then(function(response){
      if(response.status < 200 || response.status >=300){
        throw error;
      }
      return response;
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if(data.message == "true"){
        return dispatch(fetchUserStatusSuccess(true));
      } else {
        return dispatch(fetchUserStatusSuccess(false));
      }
    })
    .catch(function(error){
      console.error(error);
    })
  }
}

var initUser = function(username, password) {
  return function(dispatch) {
    var url = "/init";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var data = {
      username: username,
      password: password
    }
    var body = JSON.stringify(data);

    fetch(url, {method:"POST", headers: headers, body: body})
    .then(function(response){
      if(response.status < 200 || response.status >=300){
        throw error;
      }
      console.log(response.message);
      return;
    })
  }
}

var AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
var authenticateUserSuccess = function() {
  return {
    type: AUTHENTICATE_USER_SUCCESS
  };
};

var AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";
var authenticateUserFailure = function() {
  return {
    type: AUTHENTICATE_USER_FAILURE
  };
};


var AUTHENTICATE_USER_ERROR = "AUTHENTICATE_USER_ERROR";
var authenticateUserError = function() {
  return {
    type: AUTHENTICATE_USER_ERROR
  };
};

var authenticateUser = function(username, password) {
  return function(dispatch){
    var url = "/login";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var data = {
      username: username, 
      password: password
    };
    var body = JSON.stringify(data);

//TODO - is this the right method to use??
    fetch(url, {method: "POST", headers: headers, body: body})
    .then(function(response){
      if (response.status == 401){
        return dispatch(authenticateUserFailure());
      } else if (response.status == 200) {
        return dispatch(authenticateUserSuccess());
      } else {
        return dispatch(authenticateUserError());
      }
    });
  };
};

var RESET_FORM = "RESET_FORM";
var resetForm = function() {
  return {
    type: RESET_FORM
  }
};

var FETCH_ALL_POSTS_SUCCESS = "FETCH_ALL_POSTS";
var fetchAllPostsSuccess = function(posts) {
  return {
    type: FETCH_ALL_POSTS_SUCCESS,
    posts: posts 
  }
}

var fetchAllPosts = function() {
  return function(dispatch) {
    var url = "/all";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "GET", headers: headers})
    .then(function(response) {
      return response.json();
    })
    .then(function(allPosts) {
      return dispatch(fetchAllPostsSuccess(allPosts));
    })
    .catch(function(error) {
      console.error(error);
    });  
  }
}

var createPost = function(post) {
  return function(dispatch) {
    var body = JSON.stringify(post);

    var url = "/";
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "POST", headers: headers, body:body})
    .then(function(response) {

      return response.json();
    })
    .then(function(data) {
      return dispatch(fetchAllPosts()); 
    }); 
  }
};

var FETCH_FULL_POST_DISPLAY = "FETCH_FULL_POST_DISPLAY";
var fetchFullPostDisplay = function(post) {
  return {
    type: FETCH_FULL_POST_DISPLAY,
    post: post
  }
}

var FETCH_FULL_POST_EDIT = "FETCH_FULL_POST_EDIT";
var fetchFullPostEdit = function(post) {
  return {
    type: FETCH_FULL_POST_EDIT,
    post: post
  }
}

var fetchFullPost = function(id, type) {
  return function(dispatch) {
    var url = "/"+id;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "GET", headers: headers})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(type === FETCH_FULL_POST_EDIT) {
        return dispatch(fetchFullPostEdit(data));
      } else if (type === FETCH_FULL_POST_DISPLAY) {
        return dispatch(fetchFullPostDisplay(data));
      } else {
        throw "Error: Invalid fetch type";
      }
    })
    .catch(function(error) {
      console.error(error);
    });
  }
}

var updatePost = function(post) {
  return function(dispatch){
    var data = JSON.stringify(post);
    var url = "/"+post._id;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "PUT", headers: headers, body:data})
    .then(function(response){
      return response.json();
    })
    .then(function(){
        dispatch(fetchAllPosts()); 
    }); 
  };
};

var deletePost = function(id) {
  return function(dispatch) {
    var url = "/"+id;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(url, {method: "DELETE", headers: headers})
    .then(function(response) {
      return response.json();
    })
    .then(function() {
      return dispatch(fetchAllPosts());
    }); 
  };
};

exports.FETCH_USER_STATUS_SUCCESS = FETCH_USER_STATUS_SUCCESS;
exports.fetchUserStatus = fetchUserStatus;
exports.initUser = initUser;
exports.AUTHENTICATE_USER_SUCCESS = AUTHENTICATE_USER_SUCCESS;
exports.AUTHENTICATE_USER_FAILURE = AUTHENTICATE_USER_FAILURE;
exports.authenticateUser = authenticateUser;
exports.RESET_FORM = RESET_FORM;
exports.resetForm = resetForm; 
exports.fetchAllPosts = fetchAllPosts;
exports.FETCH_ALL_POSTS_SUCCESS = FETCH_ALL_POSTS_SUCCESS;
exports.fetchFullPost = fetchFullPost;
exports.FETCH_FULL_POST_DISPLAY = FETCH_FULL_POST_DISPLAY;
exports.FETCH_FULL_POST_EDIT = FETCH_FULL_POST_EDIT;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

