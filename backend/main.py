from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = ""
    targetHandle: str = ""

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    using DFS-based cycle detection
    """
    if not edges:
        return True
    
    # Build adjacency list
    graph = {}
    for node in nodes:
        graph[node.id] = []
    
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # DFS cycle detection
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node.id: WHITE for node in nodes}
    
    def dfs(node_id):
        if color[node_id] == GRAY:  # Back edge found = cycle
            return False
        if color[node_id] == BLACK:  # Already processed
            return True
            
        color[node_id] = GRAY
        
        for neighbor in graph.get(node_id, []):
            if not dfs(neighbor):
                return False
                
        color[node_id] = BLACK
        return True
    
    # Check all components
    for node in nodes:
        if color[node.id] == WHITE:
            if not dfs(node.id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse the pipeline and return analysis
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result,
            'status': 'success'
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Pipeline parsing error: {str(e)}")
