import React from 'react';
import ReactDOM from 'react-dom';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';
import './styles/style.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleBPMChange = this.handleBPMChange.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);

        this.state = {
            playing:  false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        }
    }

    startStop() {
        if (this.state.playing){
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                },
                this.playClick
            );
        } 
    }

    playClick() {
        const { count, beatsPerMeasure } = this.state;

        if ( count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    handleBPMChange (e) {
        const bpm = e.target.value;

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
            this.setState({
                count: 0,
                bpm
            });
        } else {
        this.setState({
            bpm: bpm
        })
        }
    } 

    render() {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input type="range" min="60" max="240" value={bpm} onChange={this.handleBPMChange} />
                </div>
                <button onClick={this.startStop} className = {playing ? 'stop' : 'start'}>{playing ? 'Stop' : 'Start'}</button>
            </div>
        );      
    }
}



function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
render();