import React, { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
