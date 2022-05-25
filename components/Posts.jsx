import { useCollection } from 'react-firebase-hooks/firestore'
import { app as firebaseApp } from '../firebase'
import { getFirestore, collection } from 'firebase/firestore'
import Post from './Post'

function Posts({ posts }) {
  const [realtimePosts] = useCollection(
    collection(getFirestore(firebaseApp), 'posts')
  )

  return (
    <div>
      {realtimePosts
        ? realtimePosts.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  )
}

export default Posts
