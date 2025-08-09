import React, { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            // Prepare pipeline data
            const pipeline = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data || {}
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle || '',
                    targetHandle: edge.targetHandle || ''
                }))
            };

            console.log('Submitting pipeline:', pipeline);

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipeline)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Backend response:', result);

            // Display user-friendly alert
            const message = `
🎉 Pipeline Analysis Complete!

📊 Results:
• Nodes: ${result.num_nodes}
• Edges: ${result.num_edges}
• Valid DAG: ${result.is_dag ? '✅ Yes' : '❌ No'}

${result.is_dag 
    ? '✨ Your pipeline is valid and ready to execute!' 
    : '⚠️ Your pipeline contains cycles. Please check your connections.'
}
            `.trim();

            alert(message);

        } catch (error) {
            console.error('Submit error:', error);
            alert(`❌ Error submitting pipeline:\n\n${error.message}\n\nPlease make sure the backend server is running on http://localhost:8000`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
        >
            {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
        </button>
    );
};
