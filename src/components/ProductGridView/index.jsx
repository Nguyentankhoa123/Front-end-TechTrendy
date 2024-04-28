import { FaPlus } from 'react-icons/fa6'
import { HiMiniCpuChip } from 'react-icons/hi2'
import { BsGpuCard } from 'react-icons/bs'
import { FaMemory, FaHdd, FaLaptop } from 'react-icons/fa'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProductGrid = () => {
  const [allLaptops, setAllLaptops] = useState([])
  const [laptops, setLaptops] = useState([])
  const [brands, setBrands] = useState([])
  const [searchBrand, setSearchBrand] = useState([])
  const [priceRange, setPriceRange] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const handleBrandClick = (brand) => {
    if (searchBrand === brand.name) {
      setSearchBrand('') // Uncheck the brand if it's already selected
    } else {
      setSearchBrand(brand.name) // Otherwise, select the brand
    }
  }
  const handlePriceRangeChange = (range) => {
    if (priceRange === range) {
      setPriceRange('')
    } else {
      setPriceRange(range)
    }
  }
  const getLaptops = async () => {
    if (!hasMore) {
      return // Nếu không còn sản phẩm để tải, không gọi API
    }
    try {
      const response = await axios.get(
        `https://localhost:5000/api/Laptops?pageNumber=${currentPage}&pageSize=8`
      )
      setLaptops((prevLaptops) => [...prevLaptops, ...response.data.data])
      setAllLaptops((prevLaptops) => [...prevLaptops, ...response.data.data])
      if (response.data.data.length < 8) {
        setHasMore(false)
      } else {
        setCurrentPage(currentPage + 1)
      }
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  const getBrands = async () => {
    try {
      const response = await axios.get(
        'https://localhost:5000/api/Brands?pageNumber=1&pageSize=15'
      )
      const laptopBrands = response.data.filter(
        (brand) => brand.productType === 'Laptop'
      )
      setBrands(laptopBrands)
      console.log(laptopBrands)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    getLaptops()
    getBrands()
  }, [hasMore])

  useEffect(() => {
    let filteredLaptops = allLaptops

    // Filter by brand
    if (searchBrand) {
      filteredLaptops = filteredLaptops.filter(
        (laptop) => laptop.brand.name === searchBrand
      )
    }

    // Filter by price range
    if (priceRange) {
      switch (priceRange) {
        case '0-10':
          filteredLaptops = filteredLaptops.filter(
            (laptop) => laptop.price > 0 && laptop.price <= 10000000
          )
          break
        case '10-15':
          filteredLaptops = filteredLaptops.filter(
            (laptop) => laptop.price > 10000000 && laptop.price <= 15000000
          )
          break
        case '15-20':
          filteredLaptops = filteredLaptops.filter(
            (laptop) => laptop.price > 15000000 && laptop.price <= 20000000
          )
          break
        case '20+':
          filteredLaptops = filteredLaptops.filter(
            (laptop) => laptop.price > 20000000
          )
          break
        default:
          break
      }
    }

    setLaptops(filteredLaptops)
  }, [searchBrand, priceRange, allLaptops])

  useEffect(() => {
    setLaptops(allLaptops)
  }, [allLaptops])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <>
      <div className="grid gap-4 p-4 pt-24 mx-auto lg:grid-cols-5 md:grid-cols-3 lg:max-w-7xl sm:max-w-full ">
        <section className="p-3 w-full space-y-[2px] bg-white divide-y rounded h-fit divide-slate-200 mt-2">
          <details className=" group">
            <summary className="flex items-center bg-[#0088cc14] text-[15px] relative cursor-pointer list-none p-4 font-medium text-[#333333] transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
              Hãng sản xuất
              <FaPlus className="absolute right-[12px] w-4 h-4 transition duration-300  shrink-0 stroke-slate-700 group-open:rotate-45" />
            </summary>
            <p className="text-[#333333]  font-normal">
              <ul className="px-5 py-4">
                {brands.map((brand, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        className="mr-3"
                        type="checkbox"
                        checked={searchBrand === brand.name}
                        onChange={() => handleBrandClick(brand)}
                      />
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            </p>
          </details>
          <details className="group">
            <summary className="flex items-center bg-[#0088cc14] text-[15px] relative cursor-pointer list-none p-4 font-medium  text-[#333333] transition-colors duration-300 focus-visible:outline-non  [&::-webkit-details-marker]:hidden">
              Mức giá
              <FaPlus className="absolute right-[12px] w-4 h-4 transition duration-300  shrink-0 stroke-slate-700 group-open:rotate-45" />
            </summary>
            <p className="mt-4  text-[#333333]  font-normal">
              <ul className="px-5 py-4">
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={priceRange === '0-10'}
                      onChange={() => handlePriceRangeChange('0-10')}
                    />
                    Dưới 10 triệu
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={priceRange === '10-15'}
                      onChange={() => handlePriceRangeChange('10-15')}
                    />
                    Từ 10 - 15 triệu
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={priceRange === '15-20'}
                      onChange={() => handlePriceRangeChange('15-20')}
                    />
                    Từ 15 - 20 triệu
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={priceRange === '20+'}
                      onChange={() => handlePriceRangeChange('20+')}
                    />
                    Trên 20 triệu
                  </label>
                </li>
              </ul>
            </p>
          </details>
          <details className=" group">
            <summary className="flex items-center bg-[#0088cc14] text-[15px] relative cursor-pointer list-none p-4 font-medium text-[#333333] transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
              Màn hình
              <FaPlus className="absolute right-[12px] w-4 h-4 transition duration-300  shrink-0 stroke-slate-700 group-open:rotate-45" />
            </summary>
            <p className="mt-4 text-[#33333]  font-normal">
              <ul className="px-5 py-4">
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    Tất cả
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    Khoảng 13 inch
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    Khoảng 14 inch
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    Trên 15 inch
                  </a>
                </li>
              </ul>
            </p>
          </details>
          <details className=" group">
            <summary className="flex items-center bg-[#0088cc14] text-[15px] relative cursor-pointer list-none p-4 font-medium text-[#333333] transition-colors duration-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              RAM
              <FaPlus className="absolute right-[12px] w-4 h-4 transition duration-300  shrink-0 stroke-slate-700 group-open:rotate-45" />
            </summary>
            <p className="mt-4 text-[#33333] font-normal">
              <ul className="px-5 py-4">
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    Tất cả
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    4GB
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    8GB
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    16GB
                  </a>
                </li>
                <li>
                  <a href="" className="block w-full mb-2 text-sm">
                    32GB
                  </a>
                </li>
              </ul>
            </p>
          </details>
        </section>
        <section className="text-gray-600 lg:col-span-4 md:col-span-2 body-font">
          <div className="">
            <InfiniteScroll
              dataLength={laptops.length}
              next={getLaptops}
              hasMore={hasMore}
            >
              <div className="grid gap-4 px-3 pb-3 mt-2 lg:grid-cols-4 md:grid-cols-2">
                {laptops.map((laptop) => (
                  <Link to={`/products/${laptop.id}`} key={laptop.id}>
                    <div className="flex flex-col w-full h-full p-4 overflow-hidden bg-white rounded shadow-md cursor-pointer hover:boxshadow-dark group">
                      <a className="relative block rounded w-full mt-[10px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                        <img
                          alt="ecommerce"
                          className="pt-2 animate-fadeIn group-hover:transition-hover-img transition-hover-product"
                          src={laptop.pictureUrls[0]}
                          loading="lazy"
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
            </InfiniteScroll>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProductGrid