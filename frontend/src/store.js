// store.js

import { create } from "zustand";

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const currentIDs = get().nodeIDs;
        const count = currentIDs[type] || 0;
        const newCount = count + 1;
        
        set({
            nodeIDs: {
                ...currentIDs,
                [type]: newCount
            }
        });
        
        return `${type}-${newCount}`;
    },
    addNode: (node) => {
        set((state) => ({
            nodes: [...state.nodes, node]
        }));
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set((state) => ({
        nodes: state.nodes.map((node) => 
          node.id === nodeId 
            ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
            : node
        )
      }));
    },
  }));
