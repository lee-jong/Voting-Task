import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 3 * 1000
});

const handleError = err => {
  let error = {};

  if (err && err.response && err.response.data) {
    error = err.response.data;
  } else {
    error = err;
  }

  return Promise.reject(error);
};

const handleSuccess = res => res.data;

// ----------------- POST ACTIONS -----------------
export const getPosts = async () => {
  return axiosInstance
    .get('/posts')
    .then(handleSuccess)
    .catch(handleError);
};

export const getPostById = async id => {
  return axiosInstance
    .get(`/posts/${id}`)
    .then(handleSuccess)
    .catch(handleError);
};
