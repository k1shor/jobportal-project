import React, { useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState([
        { id: 1, title: "My First Post", content: "This is the content of my first post!" },
        { id: 2, title: "Another Post", content: "Here is some more content to display." },
    ]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="mb-4 border-b pb-2">
                        <h3 className="font-bold">{post.title}</h3>
                        <p className="text-gray-700">{post.content}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-700">You haven't created any posts yet. Start sharing your thoughts!</p>
            )}
        </div>
    );
}

export default Posts;