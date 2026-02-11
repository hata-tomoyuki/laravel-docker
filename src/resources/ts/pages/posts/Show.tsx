import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <h1>Show Post</h1>
            <p>Post ID: {id}</p>
            <p>Post Caption: {post?.caption}</p>
            <Link to="/">Back to Home</Link>
            <Link to={`/posts/${post?.id}/edit`}>Edit Post</Link>
            <button onClick={handleDelete}>削除</button>
        </div>
    );
}
