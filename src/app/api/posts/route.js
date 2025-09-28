import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/sanity"

// GET all blog posts
export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "blog"]{_id, title, content}`)
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST a new blog post
export async function POST(req) {
  try {
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content required" }, { status: 400 })
    }

    const newPost = await client.create({
      _type: "blog",
      title,
      content,
    })

    return NextResponse.json(newPost, { status: 201 }) // ✅ return new post
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
