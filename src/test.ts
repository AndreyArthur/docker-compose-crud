import request from 'supertest';
import assert from 'assert';

import app from '@/app'
import {db} from '@/database';

const isPost = (obj: any): boolean => {
  if (obj.id.length !== 36) return false;
  if (typeof obj.content !== 'string') return false;

  return true
}

const test = async (): Promise<void> => {
  let postId: string;

  // should create a post
  {
    const { body } = await request(app)
      .post('/posts')
      .send({
        content: 'Hello World'
      })

    assert.deepStrictEqual(isPost(body), true)

    postId = body.id;
  }

  // should find post
  {
    const { body } = await request(app).get('/posts');

    assert.deepStrictEqual(isPost(body[0]), true)
    assert.deepStrictEqual(postId, body[0].id) 
  }

  // should update post
  {
    const { body } = await request(app)
      .put(`/posts/${postId}`)
      .send({
        content: 'World, Hello'
      })

    assert.deepStrictEqual(isPost(body), true)
    assert.deepStrictEqual(body.content, 'World, Hello')
    assert.deepStrictEqual(postId, body.id) 
  }

  // should delete post
  {
    await request(app)
      .delete(`/posts/${postId}`)

    const post = (await db.raw(
      'SELECT * FROM posts WHERE id = ?', [postId]
    )).rows[0]

    assert.deepStrictEqual(post, undefined)
  }

  console.log('\x1b[32m',  'Passed')
  db.destroy();
}

test();
