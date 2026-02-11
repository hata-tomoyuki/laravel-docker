import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Post {
    id: string;
    caption: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export default function Show() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const response = await fetch(`/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPost(data);
            };
            fetchPost();
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }, [id]);

    return (
        <div>
            <h1>Show Post</h1>
            <p>Post ID: {id}</p>
            <p>Post Caption: {post?.caption}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}
