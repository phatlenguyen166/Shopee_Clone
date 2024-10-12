import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
import Input from '../../Components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
  })

  console.log('Password: ', getValues('password'))

  return (
    <div className='bg-red-700'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
                className='mt-8'
                name='email'
                register={register}
              />

              <Input
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                className='mt-2'
                name='password'
                register={register}
                autoComplete='on'
              />

              <Input
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                className='mt-2'
                name='confirm_password'
                register={register}
              />

              <div className='mt-3'>
                <button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='mt-5 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản? </span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
