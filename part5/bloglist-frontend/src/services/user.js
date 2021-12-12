
import axios from 'axios'

const baseUrl = '/api/user'


const getUserBlogs = async (username) => {
  const result = await axios.get(`${baseUrl}/${username}`)
  return result.data
}

export default { getUserBlogs }