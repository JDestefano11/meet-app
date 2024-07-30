import { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            fontWeight: "bolder",
            borderColor: this.color,
            borderRadius: "7px",
            padding: "10px",
            margin: "10px 0",
            textAlign: "center",
            fontSize: "12px"
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0, 0, 128)';
        this.bgColor = 'rgb(217, 237, 247)';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 0, 0)';
        this.bgColor = 'rgb(255, 220, 220)';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(255, 165, 0)';
        this.bgColor = 'rgb(255, 243, 205)';
    }
}







export { InfoAlert, ErrorAlert, WarningAlert };




