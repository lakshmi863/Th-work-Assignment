import { useState, useEffect } from 'react';
import { getInsights } from '../apiService';

const InsightsPanel = ({ tasks }) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            setLoading(true);
            try {
                const data = await getInsights();
                setInsights(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [tasks]);

    if (loading) return <div className="insights-panel">Loading insights...</div>;
    if (!insights) return null;

    return (
        <div className="insights-panel">
            <h3>Smart Insights</h3>
            <p dangerouslySetInnerHTML={{ __html: insights.summary }} />
        </div>
    );
};

export default InsightsPanel;