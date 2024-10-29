export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 px-4 py-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='px-4 py-2 capitalize'>Sắp xếp theo</div>
          <button className='h-9 bg-orange px-4 text-center capitalize text-white hover:bg-orange/80'>Phổ biến</button>
          <button className='h-9 bg-white px-4 text-center capitalize text-black hover:bg-slate-100'>Mới nhất</button>
          <button className='h-9 bg-white px-4 text-center capitalize text-black hover:bg-slate-100'>Bán chạy</button>
          <select className='h-9 bg-white px-4 text-left capitalize text-black outline-none hover:bg-slate-100'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>giá: thấp đến cao</option>
            <option value='price:desc'>giá: cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-tr-sm bg-white px-3 shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
