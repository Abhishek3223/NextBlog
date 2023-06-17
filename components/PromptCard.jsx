"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ data, post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const PostData = JSON.parse(data.data);
  const pathName = usePathname();
  const router = useRouter();
  console.log(data.creator);
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // const handleCopy = () => {
  //   setCopied(post.prompt);
  //   navigator.clipboard.writeText(post.prompt);
  //   setTimeout(() => setCopied(false), 3000);
  // };



  return (
    <div className='prompt_card' onclick={() => {
      router.push(`/blog/id=${data._id}`)
    }}>
      <div>
        <img
          src={PostData[1].value}
          alt='user_image'
          width={40}
          height={40}
          className='object-contain w-full mb-4'
        />
      </div>
      <div className='flex justify-between items-start gap-5'>

        {/* <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div> */}
        {/* 
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>

      <p className=' font-satoshi font-bold text-lg text-gray-700'>
        {PostData[0].value}
      </p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {/* #{post.tag} */}
        #tech
      </p>

      {session?.user.id === data.creator?._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;