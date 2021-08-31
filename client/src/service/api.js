import axios from "axios";

const URL = "http://localhost:8000";

export const createPost = async (post) => {
  try {
    return await axios.post(`${URL}/create`, post);
  } catch (error) {
    console.log("Error while calling createPost API", error);
  }
};

export const getAllPosts = async (param) => {
  try {
    let response = await axios.get(`${URL}/posts${param}`);
    return response.data;
  } catch (error) {
    console.log("error while calling getAllPosts API", error);
  }
};

export const getPost = async (id) => {
  try {
    let response = await axios.get(`${URL}/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getPost api ", error);
  }
};

export const updatePost = async (id, post) => {
  try {
    await axios.post(`${URL}/update/${id}`, post);
  } catch (error) {
    console.log("Error while calling updatePost api ", error);
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${URL}/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deltePost API ", error);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${URL}/file/upload`, data);
  } catch (error) {
    console.log("error while updating the image", error);
  }
};
