import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Save published content to storage
export const savePublishedContent = (id, content) =>
  axios.post(`${BASE_URL}/publish/save`, { id, content });

// Save updated content to storage
export const saveUpdatedContent = (id, content) =>
  axios.post(`${BASE_URL}/update/save`, { id, content });

// get single article
export const getArticle = (id) =>
  axios.get(`${BASE_URL}/article/${id}`);

// history
export const getHistory = (id) =>
  axios.get(`${BASE_URL}/history/${id}`);