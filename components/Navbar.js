import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

function Navbar() {
 // const [session, loading] = useSession()
  const { data: session,loading } = useSession()
  console.log({session,loading})
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='#'>FeedBlog</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        <li>
          <Link href='/' legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/dashboard' legacyBehavior>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href='/blog' legacyBehavior>
            <a>Blog</a>
          </Link>
        </li>
        {!loading && !session && (
          <li>
            <Link href='/api/auth/signin' legacyBehavior>
              <a onClick={e=>{
                e.preventDefault()
                signIn('github')
              }}>
                Sign In
              </a>
            </Link>
          </li>
        )}
          
        {session && (
          <li>
            <Link href='/api/auth/signout' legacyBehavior>
              <a onClick={e=>{
                e.preventDefault()
                signOut()
              }}>
                Sign Out
              </a>
            </Link>
          </li>
        )}
          
      </ul>
    </nav>
  )
}

export default Navbar