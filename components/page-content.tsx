import React from 'react'

type Props = {
  title: string,
  children: React.ReactNode
}

const PageContent: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="container mt-10">
      <h1>{title}</h1>
      <div className="mt-10">
        {children}
      </div>
    </div>
  )
}

export default PageContent