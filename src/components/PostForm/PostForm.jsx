import React, { useCallback, useEffect } from 'react'
import appWriteConfig from '../../appwrite/config'
import { Input,Button,RTE,Select } from '../index';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostForm({post}) {
  const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
  },
  });
  const userData = useSelector((state)=>state.authSliceReducer.userData);
  const navigate = useNavigate();
  const postForm = async (data)=>{
    if(post){
      // update the post
      const fileData = data.image[0]? await appWriteConfig.uploadFile(data.image[0]):null;
      // upload all other update data
      if (fileData){
            appWriteConfig.deleteFile(data.featuredImage);
      
          try {
            const uploadedData = await appWriteConfig.updatePost(post.$id,{...data,featuredImage:fileData.$id});
            if(uploadedData){
              // navigate to place where it is uploaded
              navigate(`/post/${uploadedData.$id}`);
            }
          }  catch (error){
            console.log("PostForm :: updatePost in handler :: error",error);
          }
        
      }

    } else{
      // create new post
      const fileData = data.image[0]? await appWriteConfig.uploadFile(data.image[0]):null;
      // upload all data
      if(fileData){
        data.featuredImage = fileData.$id;
        try {
          const uploadedData = await appWriteConfig.createPost({...data,userId : userData.$id});
          if(uploadedData){
            // navigate to place where it is uploaded
            navigate(`/post/${uploadedData.$id}`);
          }
        } catch (error){
          console.log("PostForm :: createPost in handler :: error",error);
        }
      }
    }
  }

  // slug transform
  const slugTransform = useCallback((value)=>{
    if(value &&  typeof value === 'string'){
      return value.trim().toLowerCase().replace(/[^a-zA-Z\s\d]+/g, "-").replace(/\s/g, "-");
    }
    return "";
  },[]);

  // slug update
  useEffect (()=>{
    const subscription = watch((value,{name})=>{
      if(name === 'title'){
        setValue('slug',slugTransform(value.title),{shouldValidate:true});
      }
    });
    return () => subscription.unsubscribe();
  },[watch,slugTransform,setValue]);

  return (
    <form onSubmit={handleSubmit(postForm)}className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm;

