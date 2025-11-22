import { useState } from 'react';
import { queryGemini } from '../services/gemini';
import './AIAssistant.css'; // Add this import

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
       

<div className="ai-card">
    <div className="ai-card-glow"></div>
    
    <div className="ai-card-header">
        <div className="ai-icon-wrapper">
            <i className="fa-solid fa-robot ai-icon"></i>
        </div>
        <h5 className="ai-card-title">AI Research Assistant</h5>
        <p className="ai-card-subtitle">Ask me anything about research</p>
    </div>
    
    <div className="ai-card-body">
        {chatHistory.length > 0 && (
            <div className="chat-container">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.role === 'user' ? 'user-message' : 'ai-message'} fade-in-message`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="message-avatar">
                            {message.role === 'user' ? (
                                <i className="fa-solid fa-user"></i>
                            ) : (
                                <i className="fa-solid fa-robot"></i>
                            )}
                        </div>
                        <div className="message-content">
                            <strong className="message-sender">
                                {message.role === 'user' ? 'You' : 'AI Assistant'}
                            </strong>
                            <div className="message-text">
                                {message.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {error && (
            <div className="alert-custom alert-error slide-down">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="input-group-custom">
                <label htmlFor="aiQuery" className="input-label">
                    <i className="fa-solid fa-message-dots me-2"></i>
                    Ask me anything:
                </label>
                <div className="textarea-wrapper">
                    <textarea
                        id="aiQuery"
                        className="custom-textarea"
                        rows="3"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., What is Research Assistant?"
                        disabled={loading}
                    />
                    {query && (
                        <button
                            type="button"
                            className="clear-textarea-btn"
                            onClick={() => setQuery('')}
                            disabled={loading}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="button-group">
                <button
                    type="submit"
                    className="btn-ai-primary"
                    disabled={loading || !query.trim()}
                >
                    {loading ? (
                        <>
                            <span className="spinner-ai" role="status"></span>
                            Thinking...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-paper-plane me-2"></i>
                            Ask AI
                        </>
                    )}
                </button>
                {chatHistory.length > 0 && (
                    <button
                        type="button"
                        className="btn-ai-secondary"
                        onClick={clearChat}
                        disabled={loading}
                    >
                        <i className="fa-solid fa-trash me-2"></i>
                        Clear Chat
                    </button>
                )}
            </div>
        </form>

        {chatHistory.length === 0 && (
            <div className="examples-section">
                <p className="examples-title">
                    <i className="fa-solid fa-lightbulb me-2"></i>
                    Try these examples:
                </p>
                <div className="examples-grid">
                    {exampleQueries.map((example, index) => (
                        <button
                            key={index}
                            className="example-btn"
                            onClick={() => setQuery(example)}
                            disabled={loading}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <i className="fa-solid fa-sparkles me-2"></i>
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
