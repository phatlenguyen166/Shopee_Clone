import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import config from '../../constants/config'

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1MB. Định dạng file phải là JPG, JPEG, PNG', { autoClose: 1000 })
      event.target.value = ''
    } else {
      onChange && onChange(fileFromLocal)
    }
    // console.log(fileFromLocal)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const fileInputRef = useRef<HTMLInputElement>(null)
  return (
    <Fragment>
      <input type='file' className='hidden' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
      <button
        onClick={handleUpload}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
