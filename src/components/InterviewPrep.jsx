import { useState } from 'react';
import { queryGemini } from '../services/gemini';
import { speakText } from '../services/elevenLabs';

export default function InterviewPrep() {
    const [isActive, setIsActive] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [currentTranscript, setCurrentTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const startInterview = async () => {
        setIsActive(true);
        setConversation([]);
        setFeedback(null);
        setLoading(true);

        try {
            const question = await queryGemini(
                "You are interviewing a student for a research assistant position. Ask one warm opening question about their background. Keep it to 2 sentences. Provide the response in plain text without any markdown formatting."
            );

            setConversation([{ role: 'Interviewer', content: question }]);
            await speakText(question);
        } catch (error) {
            console.error(error);
            alert('Failed to start interview. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!currentTranscript.trim()) return;

        const answer = currentTranscript.trim();
        const updatedConv = [...conversation, { role: 'You', content: answer }];
        setConversation(updatedConv);
        setCurrentTranscript('');
        setLoading(true);

        try {
            const context = updatedConv.map(m => `${m.role}: ${m.content}`).join('\n');
            const nextQ = await queryGemini(
                `Interview conversation:\n${context}\n\nAsk a brief follow-up question (2 sentences max). Provide the response in plain text without any markdown formatting.`
            );

            setConversation([...updatedConv, { role: 'Interviewer', content: nextQ }]);
            await speakText(nextQ);
        } catch (error) {
            console.error(error);
            alert('Failed to get response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const endInterview = async () => {
        setLoading(true);
        try {
            const context = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
            const fb = await queryGemini(
                `Interview:\n${context}\n\nProvide brief feedback:\n1. Overall impression\n2. Strengths (2 points)\n3. Improvements (2 points)\n\nProvide the response in plain text without any markdown formatting.`
            );

            setFeedback(fb);
            setIsActive(false);
        } catch (error) {
            console.error(error);
            alert('Failed to generate feedback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Interview Practice</h6>
                        <div className="d-flex gap-2">
                            {!isActive && !feedback && (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => speakText("Hello, this is a voice test.")}
                                        disabled={loading}
                                    >
                                        <i className="bi bi-volume-up"></i> Test Voice
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={startInterview}
                                        disabled={loading}
                                    >
                                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-play-circle"></i>}
                                        Start
                                    </button>
                                </>
                            )}
                            {isActive && (
                                <button
                                    className="btn btn-warning"
                                    onClick={endInterview}
                                    disabled={loading}
                                >
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-stop-circle"></i>}
                                    End & Get Feedback
                                </button>
                            )}
                            {feedback && (
                                <button className="btn btn-primary" onClick={() => { setFeedback(null); setConversation([]); }}>
                                    <i className="bi bi-arrow-clockwise"></i> New Interview
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isActive && (
                <div className="card shadow-sm mb-3">
                    <div className="card-body">
                        <label className="form-label">
                            <i className="bi bi-keyboard"></i> Your Answer:
                        </label>
                        <textarea
                            className="form-control mb-3"
                            rows="3"
                            value={currentTranscript}
                            onChange={(e) => setCurrentTranscript(e.target.value)}
                            placeholder="Type your answer here..."
                            disabled={loading}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmitAnswer}
                            disabled={!currentTranscript.trim() || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Thinking...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send"></i> Submit Answer
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {conversation.length > 0 && (
                <div className="card shadow-sm mb-3">
                    <div className="card-header bg-info text-white">
                        <h6 className="mb-0">Conversation</h6>
                    </div>
                    <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {conversation.map((msg, idx) => (
                            <div key={idx} className={`mb-2 p-2 rounded ${msg.role === 'Interviewer' ? 'bg-light' : 'bg-primary bg-opacity-10'}`}>
                                <strong>{msg.role}:</strong> {msg.content}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {feedback && (
                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Feedback</h5>
                    </div>
                    <div className="card-body">
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{feedback}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
