import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const copyTask = [...task];
    copyTask.push({ title, details, id: Date.now() });
    setTask(copyTask);
    setTitle("");
    setDetails("");
  };

  const deleteNote = (id) => {
    const filteredTasks = task.filter((note) => note.id !== id);
    setTask(filteredTasks);
  };

  const deleteAllNotes = () => {
    setTask([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            QuickNotes
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Organize your thoughts in style
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/5">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 sticky top-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Note</h2>
              
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Note Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a clear title..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-white placeholder-gray-400 text-lg font-medium"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Note Content
                  </label>
                  <textarea
                    placeholder="Write your detailed notes here..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none h-48 text-gray-200 placeholder-gray-400 leading-relaxed text-base"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={6}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  + Add Note
                </button>
              </form>
            </div>
          </div>

          {/* Notes Section */}
          <div className="lg:w-3/5">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Notes</h2>
                  <p className="text-gray-400 mt-1">
                    {task.length} {task.length === 1 ? 'note' : 'notes'} saved
                  </p>
                </div>
                
                {task.length > 0 && (
                  <div className="flex gap-3">
                    <button
                      onClick={deleteAllNotes}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete All
                    </button>
                  </div>
                )}
              </div>

              {task.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-7xl mb-6 text-gray-600">📝</div>
                  <h3 className="text-2xl font-semibold text-gray-400 mb-3">No notes yet</h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">
                    Start organizing your thoughts by creating your first note!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                  {task.map((note) => (
                    <div
                      key={note.id}
                      className="bg-gradient-to-br from-gray-750 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 flex flex-col h-80 group"
                    >
                      {/* Note Header */}
                      <div className="flex-1 overflow-hidden flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-gray-600 line-clamp-2 leading-tight tracking-wide">
                          {note.title}
                        </h3>
                        
                        {/* Note Content - Fixed height with proper scrolling */}
                        <div className="flex-1 min-h-0">
                          <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-gray-300 leading-relaxed tracking-wide whitespace-pre-line text-base font-normal">
                              {note.details || (
                                <span className="text-gray-500 italic">No content added yet...</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Note Footer */}
                      <div className="pt-4 mt-4 border-t border-gray-600 flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">
                          {new Date(note.id).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default App;