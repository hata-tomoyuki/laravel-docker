import { postCreateSchema, PostCreateValues } from "@/schema/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface Post {
    id: string;
    caption: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export default function Edit() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostCreateValues>({
        resolver: zodResolver(postCreateSchema),
        defaultValues: {
            id: "",
            caption: "",
            user_id: "",
            created_at: "",
            updated_at: "",
        },
    });

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

    // 投稿取得後にフォームに反映
    useEffect(() => {
        if (post) {
            reset({
                id: post.id,
                caption: post.caption,
                user_id: post.user_id,
                created_at: post.created_at,
                updated_at: post.updated_at,
            });
        }
    }, [post, reset]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (data: PostCreateValues) => {
        setSubmitStatus("submitting");

        try {
            fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            });
            setSubmitStatus("success");
            reset(); // フォームリセット
            navigate("/");
        } catch (error) {
            setSubmitStatus("error");
        }
    };

    return (
        <div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">投稿内容</label>
                    <input id="caption" {...register("caption")} />
                    {errors.caption && <p>{errors.caption.message}</p>}
                </div>

                <button type="submit" disabled={submitStatus === "submitting"}>
                    {submitStatus === "submitting" ? "送信中..." : "送信する"}
                </button>
            </form>
        </div>
    );
}
