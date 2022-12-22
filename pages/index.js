import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
 const {data : session, loading} = useSession()
  console.log({ session, loading })
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Home</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h2  className={styles.h2}>Welcome!</h2>
      <Link href='/blog'>
       <button className={styles.button}>Get Started</button>
      </Link>
    </div>
  )
}