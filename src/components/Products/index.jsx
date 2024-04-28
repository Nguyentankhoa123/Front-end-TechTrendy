import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMiniCpuChip } from 'react-icons/hi2'
import { BsGpuCard } from 'react-icons/bs'
import { FaMemory, FaHdd, FaLaptop } from 'react-icons/fa'
const Product = () => {
  const [laptops, setLaptops] = useState([])

  useEffect(() => {
    const getLaptops = async () => {
      try {
        const response =
          await axios.get(`https://localhost:5000/api/Laptops?pageNumber=1&pageSize=8
        `)
        if (Array.isArray(response.data.data)) {
          setLaptops(response.data.data)
          console.log('Là mảng', response.data.data)
        } else {
          console.error('Error: API did not return an array')
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    getLaptops()
  }, [])

  return (
    <div>
      <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full ">
        <h2 className="mb-12 text-4xl font-extrabold text-white bg-[#00193b] rounded-[6px] py-5 px-4 boxshadow-dark">
          Sản Phẩm Nổi Bật
        </h2>
        {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="overflow-hidden rounded shadow-md cursor-pointer bg-[#031123] hover:boxshadow-dark">
            <div className="w-11/12 h-[220px]  mt-[10px] border border-solid border-[#354585] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-[#00193B]">
              <img
                src="https://res.cloudinary.com/dija8tzko/image/upload/v1713239102/E-Commerce/removal.ai__20085f18-c6ad-4490-a15c-a38dc4ad3891-screenshot_uuc9c7.png"
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6 bg-[#031123]">
              <h3 className="text-xl font-bold text-white">
                SoleStride Elegance
              </h3>
              <h4 className="mt-2 text-lg font-bold text-white">$10.5</h4>
              <p className="mt-2 text-sm text-white">
                5 types of shoos available
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded shadow-md cursor-pointer bg-[#031123] hover:boxshadow-dark">
            <div className="w-11/12 h-[220px]  mt-[10px] border border-solid border-[#354585] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-[#00193B]">
              <img
                src="https://res.cloudinary.com/dija8tzko/image/upload/v1713239882/E-Commerce/removal.ai__4c4a8b5f-cc54-45c1-a477-f0753768606f-pm_4zfwrjyiq-an_1dp5j8oj9o2ozigo_qvkmwo.png"
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6 bg-[#031123]">
              <h3 className="text-xl font-bold text-white">
                SoleStride Elegance
              </h3>
              <h4 className="mt-2 text-lg font-bold text-white">$10.5</h4>
              <p className="mt-2 text-sm text-white">
                5 types of shoos available
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded shadow-md cursor-pointer bg-[#031123] hover:boxshadow-dark">
            <div className="w-11/12 h-[220px]  mt-[10px] border border-solid border-[#354585] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-[#00193B]">
              <img
                src="https://res.cloudinary.com/dija8tzko/image/upload/v1713239882/E-Commerce/removal.ai__4c4a8b5f-cc54-45c1-a477-f0753768606f-pm_4zfwrjyiq-an_1dp5j8oj9o2ozigo_qvkmwo.png"
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6 bg-[#031123]">
              <h3 className="text-xl font-bold text-white">
                SoleStride Elegance
              </h3>
              <h4 className="mt-2 text-lg font-bold text-white">$10.5</h4>
              <p className="mt-2 text-sm text-white">
                5 types of shoos available
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded shadow-md cursor-pointer bg-[#031123] hover:boxshadow-dark">
            <div className="w-11/12 h-[220px]  mt-[10px] border border-solid border-[#354585] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-[#00193B]">
              <img
                src="https://res.cloudinary.com/dija8tzko/image/upload/v1713239882/E-Commerce/removal.ai__4c4a8b5f-cc54-45c1-a477-f0753768606f-pm_4zfwrjyiq-an_1dp5j8oj9o2ozigo_qvkmwo.png"
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6 bg-[#031123]">
              <h3 className="text-xl font-bold text-white">
                SoleStride Elegance
              </h3>
              <h4 className="mt-2 text-lg font-bold text-white">$10.5</h4>
              <p className="mt-2 text-sm text-white">
                5 types of shoos available
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded shadow-md cursor-pointer bg-[#031123] hover:boxshadow-dark">
            <div className="w-11/12 h-[220px]  mt-[10px] border border-solid border-[#354585] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-[#00193B]">
              <img
                src="https://res.cloudinary.com/dija8tzko/image/upload/v1713239882/E-Commerce/removal.ai__4c4a8b5f-cc54-45c1-a477-f0753768606f-pm_4zfwrjyiq-an_1dp5j8oj9o2ozigo_qvkmwo.png"
                alt="Product 1"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6 bg-[#031123]">
              <h3 className="text-xl font-bold text-white">
                SoleStride Elegance
              </h3>
              <h4 className="mt-2 text-lg font-bold text-white">$10.5</h4>
              <p className="mt-2 text-sm text-white">
                5 types of shoos available
              </p>
            </div>
          </div>
        </div> */}
        <section className="text-gray-600 lg:col-span-4 md:col-span-2 body-font">
          <div className="">
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
              {laptops.map((laptop) => (
                <Link
                  to={`/products/${laptop.id}`}
                  key={laptop.id}
                  className="group"
                >
                  <div className="h-full flex flex-col w-full p-4 overflow-hidden rounded shadow-md cursor-pointer bg-[white] hover:boxshadow-dark group">
                    <a className="relative block h-48 rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <img
                        alt="ecommerce"
                        className="pt-2 group-hover:transition-hover-img transition-hover-product"
                        src={laptop.pictureUrls[0]}
                      />
                    </a>
                    <div className="mt-4">
                      <h2 className="mb-1 overflow-hidden text-lg font-medium text-[#333333] title-font whitespace-nowrap text-ellipsis">
                        {laptop.name}
                      </h2>
                      <div className="bg-[#0088cc14] rounded text-[#8D8D99] text-xs py-1 px-2 mb-2 flex flex-wrap ">
                        <div className="flex items-center pb-1 mr-2 ">
                          <HiMiniCpuChip className="mr-1 text-[16px] font-size flex-shrink-0" />
                          <span className="work-break">{laptop.cpu}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <BsGpuCard className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">
                            {laptop.graphicsCard}
                          </span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaMemory className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.ram}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaHdd className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.storage}</span>
                        </div>
                        <div className="flex items-center pb-1 mr-2">
                          <FaLaptop className="mr-1 text-[16px] flex-shrink-0" />
                          <span className="work-break">{laptop.screen}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-auto text-[#4F89FC] font-bold">
                      {laptop.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Product
