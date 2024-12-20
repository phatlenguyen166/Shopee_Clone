import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] pl-1 text-sm text-red-500',
    value = '',
    onChange,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      if (onChange) {
        onChange(event)
      }
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input ref={ref} className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
})

export default InputNumber
