"use client"

import { useState, useEffect } from "react"

export default function Page() {   // 👈 name can be anything, but must return JSX
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  // fetch posts
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch("/api/posts")
    const data = await res.json()
    setPosts(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) throw new Error("Failed to save post")

      const newPost = await res.json()
      setPosts((prev) => [newPost, ...prev])
      setTitle("")
      setContent("")
    } catch (err) {
      console.error(err)
      alert("❌ Could not save post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Post"}
        </button>
      </form>

      {/* Post List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
