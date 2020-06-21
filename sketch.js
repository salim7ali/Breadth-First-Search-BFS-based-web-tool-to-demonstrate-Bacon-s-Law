//Global variables
var data;
var graph;
var dropdown;

//
function preload(){
    //Extracting movies json file
    data = loadJSON('kevinbacon.json');
}

function setup(){
    graph = new Graph();

    //Creating dropdown menu
    dropdown = createSelect();
    //When an actor is selected, we run bfs algorithm
    dropdown.changed(bfs);
    noCanvas();
    //console.log(data);

    //moving movies array to movies var
    var movies = data.movies;

    //Looping through each movie at a time to create Node object and also add it to Graph object
    for(var i = 0; i < movies.length; i++){

        //Extracting movie title and cast
        var movie = movies[i].title;
        var cast = movies[i].cast;

        //Creating movieNode node for the movie
        var movieNode = new Node(movie);
        //adding node to graph
        graph.addNode(movieNode);
        
        //Looping through movie cast array
        for(var j = 0; j < cast.length; j++){
            var actor = cast[j];
            var actorNode = graph.getNode(actor);
            if(actorNode == undefined){
                actorNode = new Node(actor);
                dropdown.option(actor);
            } 
            graph.addNode(actorNode);
            movieNode.addEdge(actorNode);
            //console.log(actor);
        }

    }
}

function bfs(){
    graph.reset();
    var start = graph.setStart(dropdown.value());
    var end = graph.setEnd("Kevin Bacon");

    console.log(graph);

    var queue = [];

    start.searched = true;
    queue.push(start);

    while(queue.length > 0){
        var current = queue.shift();
        //console.log(current.value);
        if(current == end){
            console.log("Found" + current.value);
            break;
        }
        var edges = current.edges;
        for(var i = 0; i<edges.length; i++){
            var neighbour = edges[i];
            if(!neighbour.searched){
                neighbour.searched = true;
                neighbour.parent = current;
                queue.push(neighbour);
            }
        }
    }

    var path = [];

    path.push(end);
    var next = end.parent;
    while(next != null){
        path.push(next);
        next = next.parent;
    }

    //Output representation
    var txt = '';
    for(var i=path.length - 1; i>=0; i--){
        var n = path[i];
        txt += n.value;
        if(i != 0){
            txt += ' --> ';
        }
    }
    createP(txt);
}