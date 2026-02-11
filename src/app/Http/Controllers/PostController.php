<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getPosts()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function getPost(Request $request)
    {
        $post = Post::find($request->id);
        return response()->json($post);
    }

    public function createPost(Request $request)
    {
        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    public function updatePost(Request $request, $id)
    {
        $post = Post::find($id);
        $post->update($request->all());
        return response()->json($post);
    }

    public function deletePost($id)
    {
        Post::destroy($id);
        return response()->json(null, 204);
    }
}
