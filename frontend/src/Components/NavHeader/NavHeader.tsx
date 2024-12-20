import { useContext, useRef } from 'react'
import Popover from '../Poppver'
import { AppContext } from '../../contexts/app,.context'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { purchasesStatus } from '../../constants/purchase'
import logoProfile from '../../assets/images/logo-profile.png'
import userImg from '../../assets/images/userProfile.svg'
import { get } from 'lodash'
import { getAvatarUrl } from '../../utils/utils'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      // navigate('/login')
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex'>
      <div className='flex cursor-pointer items-center py-1 hover:text-white/70'>
        <div className='text-sm'>
          <a href=''>Tải ứng dụng | </a>
        </div>
      </div>
      <div className='flex flex-grow cursor-pointer items-center py-1 hover:text-white/70'>
        <div className='ml-1 text-sm'>
          <a href=''>Kết nối | Facebook | Instagram </a>
        </div>
      </div>
      {/* <div className='flex-shrink flex-grow'></div> */}
      <Popover
        renderPopover={
          <div className='relative rounded-sm bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28'>
              <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
              <button className='mt-2 px-3 py-2 hover:text-orange'>Tiếng Anh</button>
            </div>
          </div>
        }
        className='flex cursor-pointer items-center py-1 hover:text-white/70'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1 text-sm'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='rounded-sm bg-white shadow-md'>
              <Link to={path.profile} className='block px-4 py-3 hover:bg-slate-100 hover:text-cyan-500'>
                Tài khoản của tôi
              </Link>
              <Link to={path.historyPurchase} className='block px-4 py-3 hover:bg-slate-100 hover:text-cyan-500'>
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-6 w-6 flex-shrink-0'>
            <img
              crossOrigin='anonymous'
              src={getAvatarUrl(profile?.avatar || '')}
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='text-sm'>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center text-base'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='boder-r-white/40 h-4 border-r-[1px]'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
