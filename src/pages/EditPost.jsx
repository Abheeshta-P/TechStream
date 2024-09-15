import React ,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appWriteConfig from '../appwrite/config';
import { Container,PostForm } from '../components';

function EditPost() {
  const [post,setPost] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(async ()=>{
   if(id){
    try {
      const post = await appWriteConfig.getPost(id);
      if (post){
        setPost(post);
      }
      else navigate("/");
    } catch (error){
      console.log("EditPost :: getPost use effect :: error :: Could not fetch the post ",error);
    }
   }
   else navigate("/");
  },[navigate,id]); // make the params as id in router instead slug
  
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : <div className="py-8"><Container>Could not find the post</Container></div>;
}

export default EditPost