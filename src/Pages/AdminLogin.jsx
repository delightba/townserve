import React, { useEffect, useState } from 'react'
import '../css/style.css'
import { useNavigate } from 'react-router-dom'


const AdminLogin = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const apiUrl = 'https://tmbonline.ng/api/auth/login'

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('email', login.username)
    formData.append('password', login.password)

    fetch(apiUrl,{
      method: 'POST',
  body: formData,
    }).then((res)=>{
      if(res.status === 200){
        alert('Login successful')
        navigate('/admin/dashboard/create-investmentnote')
      }
    }).catch((res)=>console.log(res))
  }

  useEffect(() => {
    document.title = 'Login page'
  }, [])
  return (
    <div className="wrapper flex justify-center items-center w-full h-screen">
      <form>
        <h1 className='greenheader'>Login</h1>
        <div className="input-box">
          <input type="text" name='username' placeholder="email" required value={login.username} onChange={handleChange} />
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="input-box">
          <input type="password" name='password' placeholder="password" required value={login.password} onChange={handleChange} />
          <i class="fa-solid fa-lock"></i>
        </div>
        <button type="submit" className="btn" onClick={handleSubmit} disabled>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin