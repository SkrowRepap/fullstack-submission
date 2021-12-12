import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}



const createBlog = async (blogObject) => {
  const header = { headers: { 'Authorization': token } }
  console.log(blogObject)
  try {
    const request = await axios.post(baseUrl, blogObject, header)
    return request.data
  } catch (error) {
    console.error(error)
  }
}

const getUserBlog = async () => {
  const header = { headers: { 'Authorization': token } }
  try {
    const request = await axios.get(`${baseUrl}/userBlogs`,header)
    return request.data
  } catch (error) {
    console.error(error)
  }
}

const updateBlog = async (blogObject, id) => {
  const header = { headers: { 'Authorization': token } }
  try {
    const request = await axios.put(`${baseUrl}/${id}`, blogObject, header)
    return request.data
  } catch (error) {
    console.error(error)
  }
}

const deleteBlog = async (id) => {
  const header = { headers: { 'Authorization': token } }
  try {
    const request = await axios.delete(`${baseUrl}/${id}`,header)
    return request.data
  } catch (error) {
    console.error(error)
  }
}


const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    return request.data
  } catch(error) {
    console.error(error)
  }
}

export default { getAll, setToken, createBlog, getUserBlog, updateBlog, deleteBlog }