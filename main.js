'use strict';

// DOM elements

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var body = document.getElementsByTagName('body')[0];

var networkNodes = [{ id: 0, src: 'computer', description: 'Client', row: 1, column: 3 }, { id: 1, src: 'setting', description: 'nginx server', row: 2, column: 3 }, { id: 2, src: 'server', description: 'League tracker Express.js app', row: 3, column: 2 }, { id: 3, src: 'hard drive', description: 'Static website', row: 3, column: 4 }, { id: 4, src: 'hard drive', description: 'Static website', row: 4, column: 1 }, { id: 5, src: 'data center', description: 'Riot API', row: 4, column: 3 }];

var paths = [{ id: 0, url: 'http://deithy.me', path: [0, 1, 0, 1, 3, 1, 0, 0, 0] }, { id: 1, url: 'https://deithy.me', path: [0, 1, 3, 1, 0, 0, 0] }, { id: 2, url: 'https://deithy.me/duo', path: [0, 1, 2, 4, 2, 1, 0, 0, 0] }, { id: 3, url: 'https://deithy.me/duo/api', path: [0, 1, 2, 5, 2, 4, 2, 1, 0, 0, 0] }];

/* TODO Make it work for unsorted */
var cellSize = 170;
var getWidthById = function getWidthById(id) {
    return networkNodes[id].column * cellSize - cellSize / 2;
};
var getHeightById = function getHeightById(id) {
    return networkNodes[id].row * cellSize - cellSize / 2;
};

var Grid = function (_React$Component) {
    _inherits(Grid, _React$Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this.steps = [];
        _this.state = {
            fromId: 0,
            toId: 0
        };
        return _this;
    }

    _createClass(Grid, [{
        key: 'travelPath',
        value: function travelPath(path) {
            var _this2 = this;

            //console.log('traveling path: ', path);
            this.steps = path;
            this.timerID = setInterval(function () {
                //console.log('Step');
                _this2.setState({
                    fromId: _this2.steps[0],
                    toId: _this2.steps[1]
                });
                _this2.steps = _this2.steps.slice(1);
                if (_this2.steps.length == 2) {
                    clearInterval(_this2.timerID);
                    //console.log('Done');
                }
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var elements = [];
            networkNodes.forEach(function (node) {
                elements.push(React.createElement(
                    'div',
                    { key: node.id, style: { gridColumnStart: node.column, gridRowStart: node.row } },
                    React.createElement('img', { src: 'assets/png/' + node.src + '.png' }),
                    React.createElement(
                        'p',
                        null,
                        node.description
                    )
                ));
            });

            elements.push(React.createElement(
                'svg',
                { key: 'path' },
                React.createElement('line', {
                    x1: getWidthById(this.state.fromId),
                    y1: getHeightById(this.state.fromId),
                    x2: getWidthById(this.state.toId),
                    y2: getHeightById(this.state.toId),
                    stroke: 'black'
                })
            ));

            var urlList = [];
            paths.forEach(function (path) {
                urlList.push(React.createElement(
                    'li',
                    { onClick: function onClick() {
                            _this3.travelPath(path.path);
                        }, key: path.id },
                    path.url
                ));
            });
            elements.push(React.createElement(
                'ul',
                { key: 'urls' },
                urlList
            ));
            return elements;
        }
    }]);

    return Grid;
}(React.Component);

ReactDOM.render(React.createElement(Grid, null), document.getElementById('root'));