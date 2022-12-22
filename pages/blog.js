import { getSession, useSession } from "next-auth/react"
import styles from '../styles/blog.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react"
import {useRouter} from 'next/router'

function Blog({data}){
  const [title, setTitle] = useState('')
  const [desc, setDec] = useState('')
  const router = useRouter()

  const fetchBlog = async () => {
    if(title && desc){

      const response = await fetch('/api/blogs', {
          method: 'POST',
          body : JSON.stringify({title,desc}),
          headers: {
              'Content-Type' : 'application/json',
          },
      })
      const data = await response.json()
      router.push("dashboard")
      console.log(data)
    }

}


  const {data : session} = useSession()
  console.log(session)
  return (
    <>
    
<div className={styles.container}>
<div className={styles.blogform}>

<div class="mb-3">
  <label for="exampleFormControlInput1" className={styles.title}>Title</label>
  <input type="text" class="form-control" id={styles.inp} placeholder="Enter title here..." value={title}
  onChange = {(e) => {
    setTitle(e.target.value)
  }}  required/>
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" className={styles.desc}>Description</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="enter description here..."
  value={desc} 
  onChange = {(e)=>{
    setDec(e.target.value)
  }} required></textarea>
</div>
<button type="button" class="btn btn-primary"  
  onClick={fetchBlog}
>submit</button>
</div>
</div>

    </>
  )
  
 
}

export default Blog

export async function getServerSideProps(context){
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/blog`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: session ? 'List of 100 personalized blogs' : 'List of free blogs',
    },
  }
} 