import React, { useEffect, useState } from 'react'
import appWriteConfig from '../appwrite/config'
import { PostCard,Container } from '../components';

function AllPosts() {
  const [posts,setPosts] = useState([]);
  useEffect(async()=>{
    try {
      const posts = await appWriteConfig.getAllPosts();     
     if(posts){
      setPosts(posts.documents);
     }
    } catch (error){
      console.log("All posts :: getAllPosts use effect :: error",error);

    }
  },[])
  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>
  )
}

export default AllPosts