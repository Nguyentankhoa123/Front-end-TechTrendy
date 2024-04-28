import { FaLaptop } from 'react-icons/fa6'
import { BsHddFill } from 'react-icons/bs'
import { FaMemory } from 'react-icons/fa'
import { Modal, Flowbite, Button } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { HiMiniCpuChip } from 'react-icons/hi2'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { fetchCartCount } from '../../cartSlice'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import FeedBack from '../../components/FeedBack'
import Comment from '../../components/Comment'
import { toast } from 'react-toastify'

const Product = () => {
  const [openModal, setOpenModal] = useState(false)
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5000/api/Products/${id}`
        )
        setProduct(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    getProduct()
  }, [id])

  const addToCart = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const decodedToken = jwtDecode(accessToken)
      const userId = decodedToken.nameid
      const productId = id
      const quantity = 1

      const response = await axios.post(
        `https://localhost:5000/api/Cart?userId=${userId}&productId=${productId}&quantity=${quantity}`
      )

      dispatch(fetchCartCount())
      toast.success('Thêm sản phẩm vào giỏ hàng thành công')
    } catch (error) {
      console.log('Lỗi khi thêm vào giỏ hàng:', error.message)
    }
  }

  // Kiểm tra xem laptop đã được tải về chưa
  if (!product) {
    return <div>Loading...</div>
  }

  const image = [
    {
      id: 1,
      url: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
    },
    {
      id: 2,
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
    },
    {
      id: 3,
      url: 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
    },
  ]

  return (
    <>
      <section className="overflow-hidden text-gray-600 body-font">
        <div>
          <div className="container py-24 mx-auto mb-20 bg-white boxshadow-productdetail">
            <div className="flex mx-auto mb-2 lg:w-4/5 shadow-[inset_0_-1px_0_0_rgba(222,226,230,1)] items-center justify-between">
              <p className="pb-5 text-2xl font-semibold text-[#333333]">
                {product.name}
              </p>
              <div className="pb-5">
                <a href="" className="text-[#0168fa]">
                  18 đánh giá
                </a>
                <span className="px-2">|</span>
                <a href="" className="text-[#0168fa]">
                  29 Hỏi & đáp
                </a>
              </div>
            </div>
            <div className="flex pt-6 mx-auto lg:w-4/5">
              <div className="flex flex-wrap items-center justify-center w-1/2">
                <Carousel className="w-full text-center">
                  {image.map((img) => (
                    <img src={img.url} key={img.id} alt="" />
                  ))}
                </Carousel>
                <div>
                  <section className="text-gray-600 body-font">
                    <div className="container px-5 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        <div className="p-4">
                          <div className="flex flex-col h-full p-3 bg-[#0088cc14] text-[#8D8D99] rounded-lg">
                            <div className="flex items-center pb-1">
                              <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.screen}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <HiMiniCpuChip className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.cpu}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.ram}</p>
                            </div>
                            <div className="flex items-center pb-1">
                              <BsHddFill className="mr-1 text-[16px] flex-shrink-0" />
                              <p className="work-break">{product.storage}</p>
                            </div>
                            <div className="flex justify-center">
                              <a
                                className="text-[#0168fa] cursor-pointer"
                                onClick={() => setOpenModal(true)}
                              >
                                Xem cấu hình chi tiết
                              </a>
                              {openModal &&
                                product.category.name === 'Laptop' && (
                                  <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                                      <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                                          {/*header*/}
                                          <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                              {product.name}
                                            </h3>
                                            <button
                                              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                                ×
                                              </span>
                                            </button>
                                          </div>
                                          {/*body*/}
                                          <div className="relative flex-auto p-6 bg-white">
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thiết kế & Trọng lượng
                                              </p>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Trọng lượng sản phẩm
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.weight}
                                                </p>
                                              </div>

                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Chất liệu
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  Nhôm
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ xử lý
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Công nghệ CPU
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.cpu}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ nhớ RAM, Ổ Cứng
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Dung lượng RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.ram}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Ổ cứng
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.storage}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Màn hình
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Kích thước màn hình
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.screen}
                                                </p>
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Đồ họa
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="py-2 w-72">
                                                  Card màn hình
                                                </p>
                                                <p className="text-[#495057]  w-full py-2">
                                                  {product.graphicsCard}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thông tin khác
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Hệ điều hành
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.os}
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Thời điểm ra mắt
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  {product.releaseDate}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 bg-white">
                                            <button
                                              className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Close
                                            </button>
                                            <button
                                              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Save Changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                  </>
                                )}
                              {openModal &&
                                product.category.name === 'Tablet' && (
                                  <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none scroll-w-none">
                                      <div className="relative w-auto max-w-3xl mx-auto my-6">
                                        {/*content*/}
                                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none h-[80vh]">
                                          {/*header*/}
                                          <div className="flex items-start justify-between p-5 border-b border-gray-200 border-solid rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                              {product.name} Test Tablet
                                            </h3>
                                            <button
                                              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                                                ×
                                              </span>
                                            </button>
                                          </div>
                                          {/*body*/}
                                          <div className="relative flex-auto p-6 bg-white">
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Thiết kế & Trọng lượng
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Kích thước
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  358,50 x 234,90 x 17,50
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Trọng lượng sản phẩm
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  1.65
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Bản lề (Hinge / Kickstand)
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Bản lề đôi
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Màu sắc
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Bạc
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Chất liệu
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Nhôm
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Bộ xử lý
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Hãng CPU
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Intel
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Công nghệ CPU
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Core i7
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Loại CPU
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  1355U
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tốc độ CPU
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  1.20 GHz Ghz
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tốc độ tối đa
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  5.00 GHz
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Số nhân
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  10
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Số luồng
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  12
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Bộ nhớ đệm
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  12 MB
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                RAM
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Dung lượng RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  16 GB (2 thanh 8 GB)
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Loại RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  DDR4
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tốc độ RAM
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  3200 MHz
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Số khe cắm rời
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  2
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Số khe RAM còn lại
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  0
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Số RAM onboard
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  0
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Hỗ trợ RAM tối đa
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  16 GB
                                                </p>
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <p className="text-base leading-relaxed  dark:text-gray-400 bg-[#f8f9fa] px-5 py-1 text-[#464646] font-semibold ">
                                                Màn hình
                                              </p>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Kích thước màn hình
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  15.6 inch
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Công nghệ màn hình
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  Anti-Glare LED-Backlit Display
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Độ phân giải
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  1920 x 1080 Pixels
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Loại màn hình
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  LED
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tần số quét
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  120 Hz
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tấm nền
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  WVA
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Độ sáng
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  250 nits
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Độ phủ màu
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  45% NTSC
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Tỷ lệ màn hình
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  16:09
                                                </p>
                                              </div>
                                              <div className="flex px-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                <p className="w-72 border-b border-[#edeeef] py-2">
                                                  Độ tương phản
                                                </p>
                                                <p className="text-[#495057] border-b border-[#edeeef] w-full py-2">
                                                  600:1
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/*footer*/}
                                          <div className="flex items-center justify-end p-6 bg-white">
                                            <button
                                              className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Close
                                            </button>
                                            <button
                                              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                              type="button"
                                              onClick={() =>
                                                setOpenModal(false)
                                              }
                                            >
                                              Save Changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                  </>
                                )}
                              {/* </Flowbite> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:mt-0">
                <h1 className="mb-1 text-3xl title-font text-[#4F89FC] font-bold">
                  {product.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </h1>
                <p className="leading-relaxed">{product.description}</p>
                <div className="block">
                  <button
                    onClick={addToCart}
                    className="w-full px-6 py-2 mt-3 text-white bg-indigo-500 border-0 rounded transition-hover focus:outline-none hover:bg-indigo-600"
                  >
                    <p className="font-medium">Mua ngay</p>
                    <p>Giao hàng miễn phí hoặc nhận tại shop</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/5 mx-auto my-auto overflow-hidden ">
          {/* <RatingProduct /> */}
          <FeedBack product={product} setProduct={setProduct} />
          <Comment product={product} />
        </div>
      </section>
    </>
  )
}

export default Product
