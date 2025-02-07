import React from 'react'

type Props = {
  name: string,
  label: string,
  placeholder?: string,
  type?: string,
  value?: string | number,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
};

const Input: React.FC<Props> = ({name, label, ...props }) => {
  return (
    <>
    <div>
      <label htmlFor={name} className="text-sm">{label}</label>
      <input {...props} name={name} id={name} className="w-full rounded-md py-2 px-5 outline-none text-sm mt-2" />
    </div>
    </>
  )
}

export default Input