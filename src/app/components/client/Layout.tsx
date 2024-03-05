'use client'
import NavAppBar from '../material/NavAppBar'
import styles from '../../page.module.css'
export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const redirect = (param: any) => {
    console.log('redirect', param)
    console.log('redirect', param?.target?.value)
  }
  return (
    <div>
      <NavAppBar handleChange={redirect} />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}
