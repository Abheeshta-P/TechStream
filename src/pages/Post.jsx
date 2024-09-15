// single post card with edit and delete option if user created it
// else a big display, when clicked on postCard in all posts

import React ,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appWriteConfig from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Container,Button } from '../components';
import {parse} from 'html-react-parser';

function Post() {
  const [post,setPost] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSliceReducer.userData);

  useEffect(async ()=>{
   if(id){
    try {
      const post = await appWriteConfig.getPost(id);
      if (post){
        setPost(post);
      }
      else navigate("/");
    } catch (error){
      console.log("post :: getPost use effect :: error :: Could not fetch the post ",error);
    }
   }
   else navigate("/");
  },[navigate,id]); // make the params as id in router instead slug

  // user is authorized to edit
  const userAuthorized = (post && userData) ? post.userId === userData.$id : false;

  const deletePost = async ()=>{
    try {
      const status = await appWriteConfig.deletePost(post.$id);
      if(status){
        appWriteConfig.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error){
      console.log("post :: deletePost :: error :: Could not delete the post ",error);
    }
  }

  return post ? (
    <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={appWriteConfig.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {userAuthorized && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
                </div>
        </Container>
    </div>
) : <div className="py-8"><Container>Could not find the post</Container></div>;
}

export default Post
