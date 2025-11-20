// This component takes a single 'post' object as a "prop" (parameter)
function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {post.title}
        </h2>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          Article
        </span>
      </div>
      
      <p className="text-gray-600 line-clamp-3">
        {post.content}
      </p>
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Author ID: {post.user_id}</span>
        {/* We format the ugly date string into something readable */}
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default PostCard;