import React, { useEffect, useState } from 'react'
import appWriteConfig from '../appwrite/config'
import { PostCard,Container } from '../components';
import { Link } from 'react-router-dom';

function Home() {
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect( ()=>{
      appWriteConfig.getAllPosts().then(posts =>{
      if(posts){
        setPosts(posts.documents);
        setLoading(false);
        }
        }).catch (error=>{
            console.log("Home page :: getAllPosts use effect :: error",error);
            setLoading(false);
         })
  },[]);
  
  if (loading) {
    return <div className='flex justify-center items-center w-full h-screen text-black'>Loading...</div>; 
  }

  if(posts?.length === 0){
    return (
      <div className="w-full py-8 mt-4 text-center h-screen  bg-zinc-300">
          <Container>
              <div className="flex flex-wrap">
                  <div className="p-2 w-full flex h-screen justify-center items-center flex-col">
                      <h1 className="text-2xl font-bold hover:text-gray-500">
                          No posts yet
                      </h1>
                      <img src="../../no-posts.jpg" alt="no posts yet" className='w-[100px] h-[300px]'/>
                      <Link to={'/add-post'} className='text-2xl font-bold hover:text-gray-500'>Add post</Link>
                  </div>
              </div>
          </Container>
      </div>
  )
}

  return (
    <div className='w-full py-8 h-screen bg-zinc-300'>
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

export default Home

