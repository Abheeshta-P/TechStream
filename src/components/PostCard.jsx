// single post card in all postcard display for general => preview

import React from 'react'
import appWriteConfig from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({
  $id,title,featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className=' w-[250px] sm:w-full bg-gray-100 rounded-xl p-4'>
    <div className='w-full justify-center mb-4'>
        <img src={appWriteConfig.getFilePreview(featuredImage)} alt={title}
        className='rounded-xl w-[264px] h-[264px] object-cover' />
    </div>
    <h2
    className='text-xl font-bold text-black text-center'
    >{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard