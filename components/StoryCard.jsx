import Image from 'next/image'

function StoryCard({ name, src, profile }) {
  return (
    <div className="overflow-x relative h-14 w-14 cursor-pointer p-3 md:h-20 md:w-20 lg:h-56 lg:w-32">
      <Image
        className="absolute top-10 z-50 rounded-full opacity-0 lg:opacity-100"
        src={profile}
        layout="fixed"
        width={40}
        height={40}
      />
      <Image
        src={src}
        layout="fill"
        className="rounded-full object-cover brightness-75 filter lg:rounded-3xl"
      />
      <p className="absolute bottom-3 hidden truncate text-sm font-medium text-white lg:block">
        {name}
      </p>
    </div>
  )
}

export default StoryCard
