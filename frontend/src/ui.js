// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { DelayNode } from './nodes/delayNode';
import { ApiNode } from './nodes/apiNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  conditional: ConditionalNode,
  delay: DelayNode,
  api: ApiNode,
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    // Use local state for ReactFlow and sync with Zustand store
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    
    const getNodeID = useStore(state => state.getNodeID);
    const setStoreNodes = useStore(state => state.setNodes);
    const setStoreEdges = useStore(state => state.setEdges);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => {
                const newNodes = applyNodeChanges(changes, nds);
                setStoreNodes(newNodes);
                return newNodes;
            });
        },
        [setStoreNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((eds) => {
                const newEdges = applyEdgeChanges(changes, eds);
                setStoreEdges(newEdges);
                return newEdges;
            });
        },
        [setStoreEdges]
    );

    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) => {
                const newEdges = addEdge({
                    ...connection,
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
                }, eds);
                setStoreEdges(newEdges);
                return newEdges;
            });
        },
        [setStoreEdges]
    );

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const type = event.dataTransfer.getData('application/reactflow');
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            setNodes((nds) => {
                const newNodes = [...nds, newNode];
                setStoreNodes(newNodes);
                return newNodes;
            });
          }
        },
        [reactFlowInstance, getNodeID, setStoreNodes]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100%', height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#4a5568" gap={gridSize} />
                <Controls />
            </ReactFlow>
        </div>
    )
}
