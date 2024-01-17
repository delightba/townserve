import React, { useEffect, useState } from 'react'
import '../css/style.css'


const AdminLogin = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(login)
  }
  useEffect(() => {
    document.title = 'Login page'
  }, [])
  return (
    <div className="wrapper flex justify-center items-center w-full h-screen">
      <form>
        <h1 className='greenheader'>Login</h1>
        <div className="input-box">
          <input type="text" name='username' placeholder="username" required value={login.username} onChange={handleChange} />
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="input-box">
          <input type="password" name='password' placeholder="password" required value={login.password} onChange={handleChange} />
          <i class="fa-solid fa-lock"></i>
        </div>
        {/* <div className="remember-password">
          <label><input type="checkbox" />remember me</label>
          <a href="'">forgotten password</a>

        </div> */}
        <button type="submit" className="btn" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin