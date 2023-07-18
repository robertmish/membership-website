"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [loading, setLoading] = React.useState(false);


    const [post, setPost] = React.useState({
        postTitle: "",
        postText: "",
    })

    const publishPost = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/publishPost", post);
            console.log("Publish success", response.data);
            
            
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

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data.username)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Create new tweet</p>
            <input type="text" value={post.postTitle} placeholder="Post tile" onChange={(e) => setPost({...post, postTitle: e.target.value})}/>
            <textarea value={post.postText} onChange={(e) => setPost({...post, postText: e.target.value})}></textarea>
           
           <button
           onClick={publishPost}
           >Publish post</button>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
    )
}