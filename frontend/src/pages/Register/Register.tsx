import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema, Schema } from '../../utils/rules'
import Input from '../../Components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app,.context'
import Button from '../../Components/Button'
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)

    const body = omit(data, ['confirm_password'])
    console.log(body)

    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        // setIsAuthenticated(true)
        navigate('/login')
        toast.success(data.data.message)
        reset()
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'error'
              })
            })
          }
        }
      }
    })
  })

  // console.log('Password: ', getValues('password'))

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
                className='relative mt-8'
                name='email'
                register={register}
              />

              <Input
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                className='relative mt-2'
                name='password'
                register={register}
                autoComplete='on'
              />

              <Input
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                className='relative mt-2'
                name='confirm_password'
                register={register}
              />

              <div className='mt-3'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
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
