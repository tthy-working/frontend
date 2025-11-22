import { useState } from 'react';
import { queryGemini } from '../services/gemini';

export default function AIAssistant() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        const userMessage = { role: 'user', content: query };
        setChatHistory(prev => [...prev, userMessage]);

        try {
            const text = await queryGemini(query + " (Provide the response in plain text without any markdown formatting)");
            setChatHistory(prev => [...prev, { role: 'assistant', content: text }]);
            setQuery('');
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
        setError(null);
    };

    const exampleQueries = [
        "What does a Research Assistant do on a daily basis?",
        "How to apply for Research Assistant positions at universities?",
        "Do international students qualify for Research Assistant roles?",
        "Top universities offering Research Assistant opportunities for undergraduates",
        "Required GPA for becoming a Research Assistant",
        "How to email a professor for a Research Assistant position?",
        "Best majors for getting Research Assistant positions",
        "What projects count as experience for Research Assistant roles?",
        "Is coding required for Research Assistant work?",
        "How to prepare for a Research Assistant interview with a professor?",
    ];

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                    <i className="bi bi-robot"></i> AI Assistant
                </h5>
            </div>
            <div className="card-body">
                {chatHistory.length > 0 && (
                    <div className="mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-3 p-3 rounded ${message.role === 'user'
                                    ? 'bg-light text-end'
                                    : 'bg-primary bg-opacity-10'
                                    }`}
                            >
                                <strong className="d-block mb-1">
                                    {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
                                </strong>
                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle"></i> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="aiQuery" className="form-label">
                            Ask me anything:
                        </label>
                        <textarea
                            id="aiQuery"
                            className="form-control"
                            rows="3"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., What is Research Assistant?"
                            disabled={loading}
                        />
                    </div>

                    <div className="d-flex gap-2 mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !query.trim()}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Thinking...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send"></i> Ask AI
                                </>
                            )}
                        </button>
                        {chatHistory.length > 0 && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={clearChat}
                                disabled={loading}
                            >
                                <i className="bi bi-trash"></i> Clear Chat
                            </button>
                        )}
                    </div>
                </form>

                {chatHistory.length === 0 && (
                    <div>
                        <p className="text-muted small mb-2">Try these examples:</p>
                        <div className="d-flex flex-wrap gap-2">
                            {exampleQueries.map((example, index) => (
                                <button
                                    key={index}
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setQuery(example)}
                                    disabled={loading}
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
