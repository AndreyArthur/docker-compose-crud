import express from 'express'

import {db} from '@/database';

const app = express();

app.use(express.json());

app.get('/posts', async (req, res) => {
  const posts = (await db.raw('SELECT * FROM posts')).rows;

  return res.send(posts)
});

app.post('/posts', async (req, res) => {
  const [post] = (await db.raw(
    `INSERT INTO posts (content) VALUES (?) RETURNING *`, [req.body.content]
  )).rows;

  return res.send(post)
})

app.put('/posts/:id', async (req, res) => {
  const [post] = (await db.raw(
    `UPDATE posts SET content = ? WHERE id = ? RETURNING *`,
    [req.body.content, req.params.id]
  )).rows

  return res.send(post);
})

app.delete('/posts/:id', async (req, res) => {
  await db.raw(
    `DELETE FROM posts WHERE id = ?`, [req.params.id]
  )

  return res.send({ok: 'post deleted'});
})

export default app;
