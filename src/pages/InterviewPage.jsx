import InterviewPrep from '../components/InterviewPrep';
import SideBar from '../components/sideBar';
import TopNavBar from '../components/TopNavBar';

export default function InterviewPage() {
    return (
        <>
            <SideBar />
            <TopNavBar />
            <div className="container-fluid p-4">
                <div className="row justify-content-center mt-5">
                    <div className="mt-5"></div>
                    <div className="col-12 col-lg-10 col-xl-8 mt-5">
                        <div className="mb-4">
                            <h2><i className="bi bi-mic"></i> Interview Practice</h2>
                            <p className="text-muted">Practice with voice conversation</p>
                        </div>

                        <div className="alert alert-info small">
                            <strong>How it works:</strong>
                            <ol className="mb-0 mt-1">
                                <li>Click "Start" - AI asks a question (you'll hear it)</li>
                                <li>Speak your answer</li>
                                <li>Click "Done Speaking"</li>
                                <li>Repeat 3-5 times</li>
                                <li>Click "End & Get Feedback"</li>
                            </ol>
                        </div>

                        <InterviewPrep />
                    </div>
                </div>
            </div>
        </>
    );
}
