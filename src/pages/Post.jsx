import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import appWriteConfig from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Container, Button, MarkdownRenderer } from '../components';

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSliceReducer.userData);
  const [loading, setLoading] = useState(true); 

  // Fetch post data
  useEffect(() => {
    if (id) {
      appWriteConfig.getPost(id)
        .then((post) => {
          if (post) {
            setPost(post);
            setLoading(false);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("post :: getPost use effect :: error :: Could not fetch the post", error);
          setLoading(false);
        })
    } else navigate("/");
  }, [navigate, id]);

  // userAuthorized 
  const userAuthorized = post && userData ? post.userId === userData.$id : false;

  if (loading) {
    return <div className='flex justify-center items-center w-full h-screen text-black'>Loading...</div>; 
  }

  // Delete post
  const deletePost = async () => {
    try {
      const status = await appWriteConfig.deletePost(post.$id);
      if (status) {
        appWriteConfig.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.log("post :: deletePost :: error :: Could not delete the post", error);
    }
  };

  return post? (
    <div className="py-8 h-screen text-black">
      <Container>
        <div className="flex justify-center mb-10 relative border border-black/10 rounded-xl h-[250px] md:h-[400px] w-[98%] object-cover">
          <img
            src={appWriteConfig.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full h-full object-cover"
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
        <div className='flex flex-col justify-center items-center'>
        <div className="w-full mb-4">
          <h1 className="text-3xl font-bold text-center">{post.title}</h1>
        </div>
        <div className='h-[1px] w-[90%] bg-black/20 mb-9'></div>
        <div className="browser-css text-base  p-5 w-[98%] ">
          <MarkdownRenderer content={post.content}/>
        </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="py-8">
      <Container>Could not find the post</Container>
    </div>
  );
}

export default Post;
