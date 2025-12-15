import { useState, useEffect, useRef } from 'react';
import DataDisplay from './DataDisplay';
import './HomeUi.css'; 

export default function HomeUi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const searchBoxRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    
    if (searchBoxRef.current) {
      observer.observe(searchBoxRef.current);
    }
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <>
      <div className="container-fluid p-4 blue-background">
        
        <div style={{ height: '30vh' }}></div>
        
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            
           
            <div className="d-flex gap-2 mb-3 justify-content-center">
              
            </div>

           
            <div 
              ref={searchBoxRef}
              className="bg-white rounded shadow p-4 mb-4 search-box card-animate"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                  </span>
                  <input
                    className="form-control border-start-0 ps-0 text-dark"
                    type="search"
                    placeholder="Search professors, departments, or research topics..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="btn btn-outline-primary clear-button" 
                      type="button"
                      onClick={() => setSearchQuery('')}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>

       
            <div className="tab-content-wrapper">
              {activeTab === 'search' && (
                <div 
                  ref={contentRef}
                  className="fade-in card-animate"
                >
                  <DataDisplay searchQuery={searchQuery} />
                </div>
              )}
              {activeTab === 'ai' && (
                <div 
                  ref={contentRef}
                  className="bg-white rounded shadow p-5 text-center fade-in card-animate card-hover"
                >
                  <i className="fa-solid fa-robot fa-3x mb-3 bounce-in icon-hover"></i>
                  <h5 className="text-dark">AI Assistant</h5>
                  <p className="text-secondary">Ask questions about research and get AI-powered insights</p>
                </div>
              )}
              {activeTab === 'bookmarked' && (
                <div 
                  ref={contentRef}
                  className="bg-white rounded shadow p-5 text-center fade-in card-animate card-hover"
                >
                  <i className="fa-solid fa-bookmark fa-3x mb-3 bounce-in icon-hover"></i>
                  <h5 className="text-dark">Bookmarked Items</h5>
                  <p className="text-secondary">Your saved professors and research topics</p>
                </div>
              )}
            </div>

           
            <div style={{ height: '50vh' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}