import * as z from "zod";

// バリデーションスキーマの定義
export const postCreateSchema = z.object({
    id: z.uuid(),
    caption: z
        .string()
        .min(2, { message: "投稿内容は2文字以上で入力してください" })
        .max(50, { message: "投稿内容は50文字以内で入力してください" }),
    user_id: z.uuid(),
    created_at: z.string(),
    updated_at: z.string(),
});

// 型定義のエクスポート
export type PostCreateValues = z.infer<typeof postCreateSchema>;
