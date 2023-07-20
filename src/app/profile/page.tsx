"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("data");
    const [loading, setLoading] = React.useState(false);
    const [published, setPublished] = React.useState(false);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    const [post, setPost] = React.useState({
        postUserId: "data",
        postTitle: "",
        postText: "",
        postDateAdded: date,
    })



    const getUserId = async () => {
        try {
              //Get user id
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
        } catch (error:any) {
            toast.error(error.message);
        }
    }
        


    const publishPost = async () => {
        try {
            //publish the post data to mongodb
            const response = await axios.post("/api/users/publishPost", post);
            console.log("Publish success", response.data);
            setPublished(true);
            
        } catch (error:any) {
            console.log("Publish failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }


    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }



    const Results = () => (
        <div id="results" className="search-results">
          Post Published
        </div>
      )

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
         
          { published ? <Results /> : null }
            <div className="grid gap-4 mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post title</label>
            <input type="text" value={post.postTitle} placeholder="Post tile" onChange={(e) => setPost({...post, postTitle: e.target.value})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post text</label>
            <textarea 
            value={post.postText} 
            onChange={(e) => setPost({...post, postText: e.target.value})}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
           
          
           <button
           onClick={publishPost} 
           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           >Publish post</button>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
        </div>

        <button
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
    )
}