'use client'
import SearchAppBar from '../material/Appbar'
import styles from '../../page.module.css'
const redirect = (param: any) => {
    console.log('redirect', param)
}
export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      {children}
    </div>
  )
}