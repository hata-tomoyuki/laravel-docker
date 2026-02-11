import { postCreateSchema, PostCreateValues } from "@/schema/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Create() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const navigate = useNavigate();

    // React Hook Formの初期化
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PostCreateValues>({
        resolver: zodResolver(postCreateSchema),
        defaultValues: {
            id: uuid(),
            caption: "",
            user_id: "019c4260-2386-72c3-a6e2-75fbf5969579", // 仮のユーザーID
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    });

    // 送信処理
    const onSubmit = async (data: PostCreateValues) => {
        setSubmitStatus("submitting");

        try {
            fetch("/api/posts", {
                method: "POST",
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
            <h1>Create Post</h1>
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
