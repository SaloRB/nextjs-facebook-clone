import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore/lite'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { db, storage } from '../firebase'

function InputBox() {
  const { data: session } = useSession()
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)

  const [imageToPost, setImageToPost] = useState(null)

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  const sendPost = (e) => {
    e.preventDefault()

    if (!inputRef.current.value) return

    addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((document) => {
      if (imageToPost) {
        const imagesRef = ref(storage, `posts/${document.id}`)

        uploadString(imagesRef, imageToPost, 'data_url').then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, 'posts', document.id)
            setDoc(docRef, { postImage: downloadURL }, { merge: true })
          })
        })

        removeImage()
      }
    })

    inputRef.current.value = ''
  }

  return (
    <div className="mt-6 rounded-2xl bg-white p-2 font-medium text-gray-500 shadow-md">
      <div className="flex items-center space-x-4 p-4">
        <Image
          src={session?.user?.image || 'https://links.papareact.com/gll'}
          width={40}
          height={40}
          layout="fixed"
          className="rounded-full"
        />

        <form className="flex flex-1">
          <input
            className="h-12 flex-grow rounded-full bg-gray-100 px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session?.user?.name}?`}
          />
          <button type="submit" hidden onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex transform cursor-pointer flex-col filter transition duration-150 hover:scale-105 hover:brightness-110"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-center text-xs text-red-500">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly border-t p-3">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={addImageToPost}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
