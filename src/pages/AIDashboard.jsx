import AIAssistant from '../components/AIAssistant';
import SideBar from '../components/sideBar';
import TopNavBar from '../components/TopNavBar';

export default function AIDashboard() {
    return (
        <>
            <SideBar />
            <TopNavBar />
            <div className="container-fluid p-4">
                <div className="row justify-content-center mt-5">
                    <div className="mt-5"></div>
                    <div className="col-12 col-lg-10 col-xl-6 mt-5">
                        <div className="mb-4">
                            <h2>
                                <i className="bi bi-robot"></i> AI Assistant
                            </h2>
                            <p className="text-muted">
                                Chat with AI to get help and answers
                            </p>
                        </div>

                        <AIAssistant />
                    </div>
                </div>
            </div>
        </>
    );
}
