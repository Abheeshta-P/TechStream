import React, { useEffect, useState } from 'react'
import appWriteConfig from '../appwrite/config'
import { PostCard,Container,PreLoader } from '../components';
import { Query } from "appwrite";
import { useSelector } from 'react-redux';

function AllPosts() {
  const [posts,setPosts] = useState([]);
  const userData = useSelector(state => state.authSliceReducer.userData);
  const [loading, setLoading] = useState(true); 

  useEffect(()=>{

      appWriteConfig.getAllPosts([Query.equal("status","active"),Query.equal("userId",userData.$id)]).then(posts =>{
        if(posts){
          setPosts(posts.documents);
          setLoading(false);
         }
      }).catch (error=>{
          console.log("All posts :: getAllPosts use effect :: error",error);
          setLoading(false);
    })
  },[])
  
  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><PreLoader color={'#27272a'} opacity={0.5}/></div>;
  }

  if(posts?.length === 0){
    return (
      <div className="w-full py-8 mt-4 text-center min-h-screen  text-black">
          <Container>
              <div className="flex flex-wrap">
                  <div className="p-2 w-full flex min-h-screen justify-center items-center">
                      <h1 className="text-2xl font-bold hover:text-gray-500">
                          No posts yet
                      </h1>
                  </div>
              </div>
          </Container>
      </div>
  )
}
  return (
    <div className='w-full py-8 min-h-screen text-black'>
    <Container>
        <div className='flex flex-wrap flex-row justify-center sm:justify-normal'>
            {posts?.map((post =>(
                <div key={post.$id} className='p-2 w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                    <PostCard {...post} />
                </div>
            )))}
        </div>
      </Container>
</div>
  )
}

export default AllPosts