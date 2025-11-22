
import { useState } from 'react';
import DataDisplay from './DataDisplay';

export default function HomeUi() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="container-fluid p-4 ">
        <div className="row justify-content-center mt-5">
          <div className="mt-5"></div>
          <div className="col-12 col-lg-8 col-xl-6 mt-5">
            {/* First Rectangle */}
            <div className="bg-white rounded shadow p-3 mb-3" style={{ minHeight: '150px' }}>
              <form className="form-inline mt-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search professors, departments, or research topics..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

            </div>

            {/* Second Rectangle */}
            <DataDisplay searchQuery={searchQuery} />

            {/* Third Rectangle */}
            <div className="bg-white rounded shadow p-3 mb-3" style={{ minHeight: '150px' }}>
              <h5 className="mb-2">Component 3</h5>
              <p className="text-muted small">Content goes here...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}