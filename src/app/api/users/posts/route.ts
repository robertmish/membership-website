import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        //const userId = await getDataFromToken(request);
        const post = await Post.find({});
        return NextResponse.json({
            mesaaage: "Posts found",
            post: Post
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}