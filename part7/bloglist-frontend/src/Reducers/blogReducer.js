const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL":
      return [...action.data.blogs];
    case "ADD_BLOG":
      return [...state, action.data.blog];
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};

export const setAllBlogs = (blogs) => {
  return {
    type: "SET_ALL",
    data: {
      blogs,
    },
  };
};

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    data: {
      blog,
    },
  };
};

export const clearAllBlogs = () => {
  return {
    type: "CLEAR_ALL",
  };
};

export default blogReducer;
