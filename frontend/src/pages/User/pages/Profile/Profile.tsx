import { useMutation, useQuery } from '@tanstack/react-query'
import Button from '../../../../Components/Button'
import Input from '../../../../Components/Input'
import userApi from '../../../../apis/user.api'
import { userSchema, UserSchema } from '../../../../utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from '../../../../Components/InputNumber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DateSelect from '../../components/DateSelect/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app,.context'
import { setProfileToLS } from '../../../../utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { ErrorResponse } from '../../../../types/utils.type'
import config from '../../../../constants/config'
import { every } from 'lodash'

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & { date_of_birth?: string }
const profileSchema = userSchema.pick(['address', 'avatar', 'phone', 'date_of_birth', 'name'])

export default function Profile() {
  const [imgFile, setImgFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const previewImage = useMemo(() => (imgFile ? URL.createObjectURL(imgFile) : ''), [imgFile])
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })

  const avatar = watch().avatar

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  // console.log(profile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (imgFile) {
        const form = new FormData()
        form.append('image', imgFile)

        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'error'
            })
          })
        }
      }
    }
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1MB. Định dạng file phải là JPG, JPEG, PNG', { autoClose: 1000 })
      event.target.value = ''
    } else {
      setImgFile(fileFromLocal)
    }
    // console.log(fileFromLocal)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='rounded-sm bg-white px-2 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-[14px]'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ và bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />

          <div className='mt-5 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 size-24'>
              <img
                crossOrigin='anonymous'
                src={previewImage || getAvatarUrl(avatar || '')}
                alt=''
                className='size-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
            <button
              onClick={handleUpload}
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
