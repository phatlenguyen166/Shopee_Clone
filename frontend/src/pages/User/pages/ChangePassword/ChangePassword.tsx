import { useForm } from 'react-hook-form'
import Button from '../../../../Components/Button'
import Input from '../../../../Components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { toast } from 'react-toastify'
import { omit } from 'lodash'
import { ErrorResponse } from '../../../../types/utils.type'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { useState } from 'react'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const [type, setType] = useState('password')
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message, { autoClose: 500 })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'error'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-[14px]'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ và bảo mật tài khoản</div>
      </div>

      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[30%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
            <div className='w-[70%] pl-5'>
              <Input
                type={type}
                classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
                className='relative'
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[30%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[70%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
                className='relative'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[30%] truncate pt-3 text-right capitalize'>Xác nhận mật khẩu</div>
            <div className='w-[70%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='confirm_password'
                type='password'
                placeholder='Xác nhận mật khẩu'
                errorMessage={errors.confirm_password?.message}
                className='relative'
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[30%] sm:text-right' />
            <div className='sm:w-[70%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
