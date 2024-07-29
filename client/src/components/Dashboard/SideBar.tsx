import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Images from '../../../public/assets'

const SideBar = () => {
  return (
      <div className='flex-col flex justify-start left-0 items-center'>
          <Link href='/dashboard'>Home</Link>
          <Image src={Images.profilePicture} className='h-8 w-8' alt='' />
          <Link href='/dashboard/boards'>Boards</Link>
          <Link href='/dashboard/settings'>Settings</Link>

    </div>
  )
}

export default SideBar