import { Link, NavLink } from 'react-router-dom'
import path from '../../../../constants/path'
import userImg from '../../../../assets/images/userProfile.svg'
import { useContext } from 'react'
import { AppContext } from '../../../../contexts/app,.context'
import { getAvatarUrl } from '../../../../utils/utils'
import classNames from 'classnames'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-gray-300 bg-gray-200 p-4'>
        <Link to={path.profile} className='size-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            crossOrigin='anonymous'
            src={getAvatarUrl(profile?.avatar || '')}
            // className='h-full w-full object-cover'
            className={userImg ? 'h-full w-full bg-orange object-cover' : 'h-full w-full object-cover'}
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate text-base font-semibold text-gray-600'>phatlenguyen</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' className='mr-2'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              ></path>
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-5'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('transition-color flex items-center capitalize', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 size-[20px]'>
            <img
              className='size-full'
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            />
          </div>
          Tài khoản của tôi
        </NavLink>
      </div>
      <div className='mt-5'>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('transition-color flex items-center capitalize', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 size-[20px]'>
            <img
              className='size-full'
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            />
          </div>
          Đổi mật khẩu
        </NavLink>
      </div>
      <div className='mt-5'>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('transition-color flex items-center capitalize', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 size-[20px]'>
            <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
