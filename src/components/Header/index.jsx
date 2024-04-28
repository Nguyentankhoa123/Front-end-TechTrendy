import { Link, useNavigate } from 'react-router-dom'

// import { jwtDecode } from 'jwt-decode'

import { useEffect, useState, useCallback } from 'react'

import { FaCartShopping } from 'react-icons/fa6'

// import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCartCount } from '../../cartSlice'
import { searchProducts } from '../../searchSlice'
import { FaUserLarge } from 'react-icons/fa6'

const Header = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.cart.count)
  // const [user, setUser] = useState(null)
  // const [isRefreshing, setIsRefreshing] = useState(false)
  // const [cartCount, setCartCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  // const refreshToken = useCallback(async () => {
  //   if (!isRefreshing) {
  //     setIsRefreshing(true)
  //     try {
  //       const currentRefreshToken = localStorage.getItem('refreshToken')

  //       const response = await axios.post(
  //         'https://localhost:5000/api/RefreshToken/refresh-token',
  //         {
  //           AccessToken: localStorage.getItem('accessToken'),
  //           RefreshToken: currentRefreshToken,
  //         }
  //       )

  //       if (response.data.statusCode === 200) {
  //         console.log(response.data.data)
  //         localStorage.setItem('accessToken', response.data.data.accessToken)
  //         localStorage.setItem('refreshToken', response.data.data.refreshToken)
  //         const decodedToken = jwtDecode(response.data.data.accessToken)
  //         setUser(decodedToken)
  //       }
  //     } catch (error) {
  //       console.log('Lỗi khi làm mới token:', error.message)
  //       localStorage.removeItem('accessToken')
  //       localStorage.removeItem('refreshToken')
  //       setUser(null)
  //     } finally {
  //       setIsRefreshing(false)
  //     }
  //   }
  // }, [isRefreshing])

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken')
  //   if (token) {
  //     const decodedToken = jwtDecode(token)
  //     if (decodedToken.exp * 1000 < Date.now()) {
  //       refreshToken()
  //     } else {
  //       setUser(decodedToken)
  //     }
  //   }
  // }, [refreshToken])

  useEffect(() => {
    dispatch(fetchCartCount())
  }, [dispatch])

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  const handleSearchChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (inputValue.trim() !== '') {
      dispatch(searchProducts(inputValue))
      navigate(`/search?query=${inputValue}`)
    }
  }

  return (
    <header className="inline-block w-full body-font bg-[#00193b] text-white boxshadow-dark">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto text-white md:flex-row">
        <Link
          to="/"
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-white">Tailblocks</span>
        </Link>
        <form className="flex-grow max-w-xl mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 text-sm text-white border border-solid border-[#354585] rounded-lg ps-10  focus:border-[#4F89FC]  focus-visible:border-[#4F89FC] outline-none focus:hide-placeholder bg-[#00193B] "
              placeholder="Search Mockups, Logos..."
              value={inputValue}
              onChange={handleSearchChange}
              required
            />
            <button
              onClick={handleSearchSubmit}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <nav className="flex flex-wrap items-center justify-center text-base gap-7 md:ml-auto">
          <Link to="/product_grid" className="text-lg">
            Laptop
          </Link>
          <Link to="/tablet" className="text-lg">
            Tablet
          </Link>
          <Link to="/news" className="text-lg">
            Tin tức
          </Link>
          <Link to="/cart" className="relative ">
            <FaCartShopping className="text-2xl " />
            <span className="absolute top-[-13px] right-[-8px] min-w-[20px] min-h-20[px] flex items-center justify-center text-sm bg-[#f5a623] rounded-full">
              {count}
            </span>
          </Link>
          {user ? (
            <div className="">
              <div className="relative inline-block text-left">
                <div className="group">
                  <button
                    type="button"
                    className="rounded-full  flex flex-col items-center justify-center w-14 h-14 text-sm font-medium text-white bg-[#4F89FC]  focus:outline-none focus:bg-gray-700"
                  >
                    <div className="text-[15px] ">
                      {user.given_name[0]} {user.family_name[0]}
                    </div>
                  </button>
                  <span className="absolute left-0 w-full h-5 top-9"></span>

                  <div></div>
                  <div className="absolute -left-[50px] invisible w-[100px] mt-1 transition duration-300 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 top-12 group-hover:opacity-100 group-hover:visible">
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 text-sm text-gray-700"
                        onClick={logout}
                      >
                        Đăng xuất
                      </a>
                    </div>
                    <div className="flex justify-center px-4 py-2 text-sm text-gray-700">
                      <Link to="/orderhistory">Đơn mua</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-3 py-1 mt-4 text-base text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-blue-800 md:mt-0"
            >
              Tài khoản
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
