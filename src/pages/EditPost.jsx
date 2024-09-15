import React ,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appWriteConfig from '../appwrite/config';
import { Container,PostForm } from '../components';

function EditPost() {
  const [post,setPost] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(()=>{
      if(id){
        appWriteConfig.getPost(id).then(post=>{
          if (post){
            setPost(post);
            setLoading(false);
          }
          else navigate("/");
        }).catch (error=>{
            console.log("EditPost :: getPost use effect :: error :: Could not fetch the post ",error);
            setLoading(false);
        })
      }
    else navigate("/");
  },[navigate,id]); // make the params as id in router instead slug
  
  if (loading) {
    return <div className='flex justify-center items-center w-full h-screen'>Loading...</div>; 
  }

  return post? (
    <div className='py-8 h-screen'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : <div className="py-8"><Container>Could not find the post</Container></div>;
}

export default EditPost