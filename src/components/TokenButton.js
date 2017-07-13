import React from 'react'

class TokenButton extends React.Component {
  constructor(){
    super()
    this.onClick = this.onClick.bind(this);

    this.state = {
      active: false
    }
    const { styleClass } = 'button';
  }
  componentDidMount(){
    // this.connection = new WebSocket('wss://echo.websocket.org');
    this.socket = new WebSocket('ws://localhost:1337');
    this.socket.onopen = function(event){
      console.log('Connected to: ' + event.currentTarget.URL);
      // socketStatus.className = 'open';
    }
    this.socket.onmessage = event => {
      console.log(event.data);
    }
    this.socket.onerror = function(error){
      console.log('WebSocket Error: ' + error);
    }
    this.socket.onclose = function(event){
      console.log('WebSocket closed');
    }
  }

  onClick(event){
    this.setState({ active: !this.state.active }, function(){
      // var msg = this.props.message + '-' + this.state.active.toString();
      // var msg = "{\"token\": \"" + this.props.reference + "\", \"active\": \"" + this.state.active.toString() + "\"}";
      //correct //var msg = "{\"tag\":" + this.props.reference + ",\"status\":" + this.state.active.toString() + "}";

      // var bool = this.state.active.toString();
      var status = this.state.active.toString();

      var msg = {
        "tag": this.props.reference,
        "status": status
      }

      // var msg = "{\"test\": \"testmessage\", \"activated\": \"truz\"}";

      this.socket.send(JSON.stringify(msg));
      // this.socket.send(msg);
    });

  }

  render(){

    if(this.state.active){
      this.styleClass = 'button-active'
    }else{
      this.styleClass = 'button'
    }

    return(
      <div className={this.styleClass} onClick={(e) => this.onClick(e)}>
        {this.props.tokenName}
      </div>
    )
  }
}

TokenButton.propTypes = {
  tokenName: React.PropTypes.string.isRequired,
  reference: React.PropTypes.string.isRequired
}

export default TokenButton;
