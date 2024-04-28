import { useState } from 'react'
import axios from 'axios'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    googleLogout()
    setIsLoggedIn(false)
  }

  const signIn = async () => {
    try {
      const response = await axios.post(
        'https://localhost:5000/api/Accounts/SignIn',
        {
          UserName: username,
          Password: password,
        }
      )

      console.log(response.data)
      if (response.data.statusCode === 200) {
        alert('Đăng nhập thành công')
        // Lưu access token và refresh token vào local storage
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
        navigate('/')
      }
    } catch (error) {
      if (error.response) {
        console.log('Lỗi từ server:', error.response.data)
      } else if (error.request) {
        console.log('Không nhận được phản hồi từ server:', error.request)
      } else {
        console.log('Lỗi khi thiết lập yêu cầu:', error.message)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-white sm:bg-gray-200">
      <div className="w-full h-screen px-8 py-8 bg-white shadow-none sm:shadow-lg sm:px-12 xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 sm:h-auto">
        <div className="w-full p-4 text-3xl font-bold text-center text-gray-600">
          Đăng nhập
        </div>
        <div className="w-full my-3 bg-gray-200"></div>
        <form>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Tên đăng nhập</label>

              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Tên tài khoản"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Mật khẩu</label>

              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Mật khẩu đăng nhập"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full">
              <button
                className="flex flex-row items-center justify-center w-full gap-1 p-2 text-indigo-500 duration-100 ease-in-out border border-indigo-500 hover:bg-indigo-500 hover:text-white"
                type="button"
                onClick={signIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>{' '}
                Đăng nhập
              </button>
            </div>

            <div className="flex flex-row justify-end w-full">
              <Link to="/forgotpassword">
                <a href="#">Quên mật khẩu</a>
              </Link>
            </div>
            <div className="flex flex-row items-center justify-center my-2">
              <div className="bg-[#dbdbdb] flex-1 h-[1px] w-full"></div>
              <span className="px-4 bg-white ">Hoặc</span>
              <div className="bg-[#dbdbdb] flex-1 h-[1px] w-full"></div>
            </div>
            <div className="flex flex-row w-full gap-2">
              {!isLoggedIn ? (
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                  text="Đăng nhập bằng Google"
                />
              ) : (
                <button onClick={handleLogout}>Đăng xuất</button>
              )}

              <LoginSocialFacebook
                appId="1805063776679899"
                onResolve={(response) => {
                  console.log(response)
                }}
                onReject={(error) => {
                  console.log(error)
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
            </div>
            <div className="flex flex-row items-center justify-center my-2">
              <p>
                Bạn mới đến ShopDev?{' '}
                <Link to="/register" className="text-blue-600 cursor-pointer">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
