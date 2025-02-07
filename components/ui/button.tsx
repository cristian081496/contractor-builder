import React from 'react'

type Props = {
  name: string,
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({ name, ...props }) => {
  return (
    <>
      <button {...props} className="rounded-md bg-gray-700 text-white py-2 px-5 text-sm" >{name}</button>
    </>
  )
}

export default Button