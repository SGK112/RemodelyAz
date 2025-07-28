import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProjectDetails();
    fetchProjectFiles();
    fetchProjectMessages();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProject(data.data);
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectFiles = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/files?project_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFiles(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching project files:', error);
    }
  };

  const fetchProjectMessages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/messages?project_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching project messages:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const token = localStorage.getItem('access_token');

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('project_id', id);
        formData.append('file_type', file.type.startsWith('image/') ? 'image' : 'document');

        const response = await fetch(`${API_BASE}/files/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      // Refresh files list
      await fetchProjectFiles();
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: id,
          content: newMessage,
          message_type: 'text'
        })
      });

      if (response.ok) {
        setNewMessage('');
        await fetchProjectMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: id,
          content: newNote,
          message_type: 'note'
        })
      });

      if (response.ok) {
        setNewNote('');
        await fetchProjectMessages();
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const downloadFile = async (fileId, fileName) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/files/${fileId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const deleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchProjectFiles();
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Project not found</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'active' ? 'bg-green-100 text-green-800' : 
                project.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-2 text-gray-600">{project.description}</p>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {project.project_type}
            </span>
            <span>Created: {formatDate(project.created_at)}</span>
            {project.share_link && (
              <span className="text-green-600">Share link available</span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'files', name: 'Files & Photos', icon: '📁' },
              { id: 'messages', name: 'Messages', icon: '💬' },
              { id: 'notes', name: 'Notes', icon: '📝' },
              { id: 'calendar', name: 'Schedule', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Project Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.project_type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.created_at)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.updated_at)}</dd>
                  </div>
                </dl>
                
                {project.share_link && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900">Share Link</h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Send this link to clients to give them access to this project:
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="text"
                        value={project.share_link}
                        readOnly
                        className="flex-1 text-sm bg-white border border-blue-200 rounded px-3 py-2"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(project.share_link)}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Files</span>
                    <span className="font-semibold">{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Messages</span>
                    <span className="font-semibold">{messages.filter(m => m.message_type === 'text').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notes</span>
                    <span className="font-semibold">{messages.filter(m => m.message_type === 'note').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Files & Photos</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : '📤 Upload Files'}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Upload photos, documents, and other project files. Supported formats: Images, PDF, Word documents, Text files.
                </p>
              </div>
              
              <div className="p-6">
                {files.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No files uploaded yet</h3>
                    <p className="text-gray-600 mb-4">Upload photos and documents to get started</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Upload First File
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {files.map((file) => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">
                            {file.file_type === 'image' ? '🖼️' : '📄'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => downloadFile(file.id, file.original_name)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                              title="Download"
                            >
                              ⬇️
                            </button>
                            <button
                              onClick={() => deleteFile(file.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm text-gray-900 truncate" title={file.original_name}>
                          {file.original_name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(file.file_size)} • {formatDate(file.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Project Messages</h3>
              <p className="mt-2 text-sm text-gray-600">
                Communicate directly with team members and clients about this project.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.filter(m => m.message_type === 'text').map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {message.sender_name?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm text-gray-900">
                          {message.sender_name || 'User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {messages.filter(m => m.message_type === 'text').length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-600">No messages yet. Start the conversation!</p>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Project Notes</h3>
              <p className="mt-2 text-sm text-gray-600">
                Keep track of important information, observations, and reminders.
              </p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleAddNote} className="mb-6">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </div>
              </form>
              
              <div className="space-y-4">
                {messages.filter(m => m.message_type === 'note').map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-yellow-800">
                        📝 Note by {note.sender_name || 'User'}
                      </span>
                      <span className="text-xs text-yellow-600">
                        {formatDate(note.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-yellow-900">{note.content}</p>
                  </div>
                ))}
                
                {messages.filter(m => m.message_type === 'note').length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-gray-600">No notes yet. Add your first note above!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Project Schedule</h3>
              <p className="mt-2 text-sm text-gray-600">
                Manage project timeline, milestones, and appointments.
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  Schedule appointments, set milestones, and sync with Google Calendar
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Set Up Calendar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

