import { useState, useEffect } from 'react';

export default function DataDisplay() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://uvddanzqgxbmjzwgstau.supabase.co/storage/v1/object/public/json-files_1/professors_no_college_grouped.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <div className="bg-white rounded shadow p-3 mb-3" style={{ minHeight: '150px' }}>
            <h5 className="mb-2">Fetched Data</h5>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
