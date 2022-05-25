import { collection, orderBy, query, getDocs } from 'firebase/firestore/lite'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { db } from '../firebase'

export default function Home({ user, posts }) {
  if (!user) return <Login />

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Head>
        <title>Facebook 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context)

  const postsRef = collection(db, 'posts')

  const q = query(postsRef, orderBy('timestamp', 'desc'))

  const querySnapshot = await getDocs(q)

  const posts = querySnapshot.docs.map((doc) => doc.data())

  const docs = posts.map((post) => ({
    ...post,
    timestamp: null,
  }))

  return {
    props: {
      user: session,
      posts: docs,
    },
  }
}
