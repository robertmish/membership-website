import {connect} from "@/dbConfig/dbConfig";
import Post from "@/models/postModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {postTitle, postText, published} = reqBody

        console.log(reqBody);

        //check if user already exists
        const post = await Post.findOne({postTitle})

        if(post){
            return NextResponse.json({error: "Post already exists"}, {status: 400})
        }

        const newPost = new Post({
            postTitle,
            postText,
            published,
        })

        const savedPost = await newPost.save()
        console.log(savedPost);


        return NextResponse.json({
            message: "Post published",
            success: true,
            savedPost
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}