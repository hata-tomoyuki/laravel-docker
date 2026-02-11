<?php

declare(strict_types=1);

namespace Tests\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_投稿が無いときは空配列が返る(): void
    {
        $response = $this->getJson('/api/posts');

        $response->assertStatus(200)
            ->assertExactJson([]);
    }

    public function test_投稿一覧が返る(): void
    {
        $post = Post::create([
            'caption' => 'Test caption',
            'user_id' => $this->user->id,
        ]);

        $response = $this->getJson('/api/posts');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonFragment([
                'id' => $post->id,
                'caption' => 'Test caption',
                'user_id' => $this->user->id,
            ]);
    }

    public function test_指定した投稿1件が返る(): void
    {
        $post = Post::create([
            'caption' => 'Single post',
            'user_id' => $this->user->id,
        ]);

        $response = $this->getJson("/api/posts/{$post->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $post->id,
                'caption' => 'Single post',
                'user_id' => $this->user->id,
            ]);
    }

    public function test_存在しないIDの場合はnullが返る(): void
    {
        $response = $this->getJson('/api/posts/00000000-0000-0000-0000-000000000000');

        $response->assertStatus(200);
        $decoded = json_decode($response->getContent());
        $this->assertTrue(
            $decoded === null || (is_object($decoded) && (array) $decoded === []),
            '存在しないIDの場合は null または空オブジェクトが返ること'
        );
    }

    public function test_投稿を作成すると201と作成した投稿が返る(): void
    {
        $data = [
            'caption' => 'New post',
            'user_id' => $this->user->id,
        ];

        $response = $this->postJson('/api/posts', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'caption' => 'New post',
                'user_id' => $this->user->id,
            ]);
        $this->assertDatabaseHas('posts', [
            'caption' => 'New post',
            'user_id' => $this->user->id,
        ]);
    }

    public function test_投稿を更新すると更新後の投稿が返る(): void
    {
        $post = Post::create([
            'caption' => 'Original',
            'user_id' => $this->user->id,
        ]);

        $response = $this->putJson("/api/posts/{$post->id}", [
            'caption' => 'Updated caption',
            'user_id' => $this->user->id,
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'caption' => 'Updated caption',
                'user_id' => $this->user->id,
            ]);
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'caption' => 'Updated caption',
        ]);
    }

    public function test_投稿を削除すると204が返りレコードが削除される(): void
    {
        $post = Post::create([
            'caption' => 'To delete',
            'user_id' => $this->user->id,
        ]);

        $response = $this->deleteJson("/api/posts/{$post->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }
}
