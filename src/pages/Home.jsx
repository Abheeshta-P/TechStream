import React, { useEffect, useState } from 'react'
import appWriteConfig from '../appwrite/config'
import { PostCard,Container,PreLoader,Hero } from '../components';
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
    return <div className="w-full h-screen flex justify-center items-center"><PreLoader color={'#27272a'} opacity={0.5}/></div>;
  }

  if(posts?.length === 0){
    return (
      <>
        <Hero/>
      <div className="w-full py-8 mt-4 text-center min-h-screen  bg-zinc-300 hero">
          <Container>
              <div className="flex flex-wrap">
                  <div className="p-2 w-full flex min-h-screen justify-center items-center flex-col">
                      <h1 className="text-2xl font-bold hover:text-gray-500">
                          No posts yet
                      </h1>
                      <img src="../../no-posts.jpg" alt="no posts yet" className='w-[100px] h-[300px]'/>
                      <Link to={'/add-post'} className='text-2xl font-bold hover:text-gray-500'>Add post</Link>
                  </div>
              </div>
          </Container>
      </div>
      </>
  )
}

  return (
   <>
   <Hero/>
   <div className='w-full py-8 min-h-screen bg-zinc-300 hero'>
    <Container>
      <h1 className='text-zinc-950 font-bold text-5xl md:text-6xl text-center mb-8'>Posts</h1>
        <div className='flex flex-wrap flex-row justify-center sm:justify-normal'>
            {posts?.map((post) => (
                <div key={post.$id} className='p-2 w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </Container>
</div>
   </>
  )

}

export default Home

