'use strict';

// DOM elements
const body = document.getElementsByTagName('body')[0]

const networkNodes = [
    { id: 0, src: 'computer', description: 'Client', row: 1, column: 3 },
    { id: 1, src: 'setting', description: 'nginx server', row: 2, column: 3},
    { id: 2, src: 'server', description: 'League tracker Express.js app', row: 3, column: 2},
    { id: 3, src: 'hard drive', description: 'Static website', row: 3, column: 4},
    { id: 4, src: 'hard drive', description: 'Static website', row: 4, column: 1},
    { id: 5, src: 'data center', description: 'Riot API', row: 4, column: 3}
];

const paths = [
    { id: 0, url: 'http://deithy.me', path: [ 0, 1, 0, 1, 3, 1, 0, 0, 0]},
    { id: 1, url: 'https://deithy.me', path: [ 0, 1, 3, 1, 0, 0, 0]},
    { id: 2, url: 'https://deithy.me/duo', path: [ 0, 1, 2, 4, 2, 1, 0, 0, 0]},
    { id: 3, url: 'https://deithy.me/duo/api', path: [ 0, 1, 2, 5, 2, 4, 2, 1, 0, 0, 0]}
];

/* TODO Make it work for unsorted */
const cellSize = 170;
const getWidthById = id => {
    return (networkNodes[id].column * cellSize) - (cellSize / 2);
};
const getHeightById = (id) => {
    return (networkNodes[id].row * cellSize) - (cellSize / 2);
};

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.steps = [];
        this.state = {
            fromId: 0, 
            toId: 0
        };
    }

    travelPath(path) {
        //console.log('traveling path: ', path);
        this.steps = path;
        this.timerID = setInterval(() => {
            //console.log('Step');
            this.setState({
                fromId: this.steps[0],
                toId: this.steps[1]
            });
            this.steps = this.steps.slice(1);
            if(this.steps.length == 2) {
                clearInterval(this.timerID);
                //console.log('Done');
            }
        }, 1000);
    }

    render() {
        let elements = [];
        networkNodes.forEach(node => {
            elements.push(
                <div key={node.id} style={{gridColumnStart: node.column, gridRowStart: node.row}}>
                    <img src={'assets/png/' + node.src + '.png'}/>
                    <p>{node.description}</p>
                </div>
            );
        });

        elements.push(
            <svg key='path'>
                <line 
                    x1={getWidthById(this.state.fromId)} 
                    y1={getHeightById(this.state.fromId)}
                    x2={getWidthById(this.state.toId)}
                    y2={getHeightById(this.state.toId)}
                    stroke="black"
                />
            </svg>
        );
        
        let urlList = [];
        paths.forEach(path => {
            urlList.push(
                <li onClick={() => {this.travelPath(path.path)}} key={path.id}>
                    {path.url}
                </li>
            );
        });
        elements.push(<ul key='urls'>{urlList}</ul>);
        return elements;
    }
}
ReactDOM.render(<Grid/>,document.getElementById('root'));
