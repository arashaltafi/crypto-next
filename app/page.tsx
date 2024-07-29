"use client"

import { ResponseCoin } from '@/utils/Utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination';

const Home = () => {
  const [response, setResponse] = useState<ResponseCoin[]>()
  const [responseModal, setResponseModal] = useState<any>()
  const [currency] = useState("usd")
  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const fetchData = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const pageSize = process.env.NEXT_PUBLIC_PAGE_LIMIT;

    const res = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${API_KEY}`)
    const data: any = await res.json();

    setResponse(data)
    router.push(`/?page=${page}`)
  }

  useEffect(() => {
    fetchData()
    scrollToTop()
  }, [page])

  if (!response || response?.length === 0) {
    return (
      <div className='max-w-[1440px] mx-auto w-full h-full flex-1 px-16 py-8 flex flex-col items-center justify-center gap-8'>
        <h1 className='text-4xl font-bold'>No Data Found</h1>
      </div>
    )
  }

  const handleShowModal = async () => {
    console.log('handleShowModal')
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const res = await fetch(`${BASE_URL}/coins/bitcoin/market_chart?vs_currency=${currency}&days=7&x_cg_demo_api_key=${API_KEY}`)
    const data: any = await res.json();

    setResponseModal(data)
  }

  return (
    <>
      {
        responseModal && (
          <div className='fixed inset-0 bg-gray-500/50 flex items-center justify-center'>
            <div className='z-10 bg-gray-500 w-1/2 px-16 py-8 rounded-3xl'>
              <div className='w-full flex justify-between items-center'>
                <h2>close</h2>
                <h2>modal</h2>
              </div>
            </div>
            <div className='fixed inset-0' onClick={() => setResponseModal(null)} />
          </div>
        )
      }
      <div className='max-w-[1440px] mx-auto w-full h-full flex-1 px-16 py-8 flex flex-col items-center justify-center gap-8'>
        <div className="w-full rounded-lg border border-gray-500 overflow-hidden">
          <table className="w-full rounded-lg h-full">
            <thead className="bg-gray-300 dark:bg-gray-700 border-b-gray-400 dark:border-b-gray-500 border-b *:py-8">
              <tr className="*:py-4 *:px-6 *:font-normal">
                <th className="text-xl font-bold">Coin</th>
                <th className="text-xl font-bold">Name</th>
                <th className="text-xl font-bold">Price</th>
                <th className="text-xl font-bold">24h</th>
                <th className="text-xl font-bold text-left">Total Volume</th>
                <th className="text-xl font-bold text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 dark:bg-gray-800 text-center h-full">
              {
                response?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b-[0.5px] border-b-gray-500 last:border-b-0 *:font-normal"
                  >
                    <td
                      className='text-lg flex items-center justify-center gap-1 py-8 px-6 cursor-pointer'
                      onClick={handleShowModal}
                    >
                      <Image
                        src={item.image}
                        alt='coin logo'
                        width={24}
                        height={24}
                      />
                      <p>{item.symbol}</p>
                    </td>
                    <td className='text-lg border-x border-gray-600 py-8 px-6'>{item.name}</td>
                    <td className='text-lg py-8 px-6'>{`$${(item.current_price).toLocaleString()}`}</td>
                    <td className='text-lg border-x border-gray-600'>
                      {
                        (item.market_cap_change_percentage_24h > 0) ? (
                          <p className='text-green-500'>{item.market_cap_change_percentage_24h.toFixed(2)}%</p>
                        ) : (
                          <p className='text-red-500'>{item.market_cap_change_percentage_24h.toFixed(2)}%</p>
                        )
                      }
                    </td>
                    <td className='h-full text-lg py-8 px-6'>
                      {`$${(item.total_volume).toLocaleString()}`}
                    </td>
                    <td>
                      <Image
                        src={item.market_cap_change_percentage_24h > 0 ? 'icons/chart-down.svg' : 'icons/chart-up.svg'}
                        alt={`${item.market_cap_change_percentage_24h > 0 ? 'chart down' : 'chart up'}`}
                        width={1000}
                        height={50}
                        className='w-24'
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className='w-full flex items-center justify-center gap-8'>
          <ResponsivePagination
            current={page}
            total={10}
            onPageChange={(page) => {
              setPage(page)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Home