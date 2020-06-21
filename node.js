function Node(value){
    this.value = value;
    this.edges = [];
    this.searched = false;
    this.parent = null;
}

Node.prototype.addEdge = function(neighbour){
    this.edges.push(neighbour);
    neighbour.edges.push(this);
}