import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
    id: string;
    caption: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const response = await fetch("/api/posts");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Post[] = await response.json();
                setPosts(data);
            };
            fetchPosts();
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <p>{post.caption}</p>
                        <small>
                            Posted by User {post.user_id} on{" "}
                            {new Date(post.created_at).toLocaleDateString()}
                        </small>
                    </li>
                ))}
            </ul>
            <Link to="/posts/create">作成</Link>
        </div>
    );
}
