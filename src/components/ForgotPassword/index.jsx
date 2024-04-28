import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `https://localhost:5000/api/Accounts/ForgotPassword?email=${email}`,
        {
          Email: email,
        }
      )
      if (response.status === 200) {
        toast.success('Đã gửi thông tin đến email')
      } else {
        toast.error('Đã có lỗi')
      }
    } catch (error) {
      alert('An error occurred')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-white sm:bg-gray-200">
      <div className="w-full h-screen px-8 py-8 bg-white shadow-none sm:shadow-lg sm:px-12 xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 sm:h-auto">
        <div className="w-full p-4 text-3xl font-bold text-center text-gray-600">
          Quên mật khẩu
        </div>
        <div className="w-full my-3 bg-gray-200"></div>
        <form>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Email</label>

              <input
                className="w-full py-2 pl-3 border border-gray-200"
                placeholder="Nhập địa chỉ email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full">
              <button
                className="flex flex-row items-center justify-center w-full gap-1 p-2 text-indigo-500 duration-100 ease-in-out border border-indigo-500 hover:bg-indigo-500 hover:text-white"
                type="button"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
