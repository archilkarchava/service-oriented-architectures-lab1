import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       calcInput: "",
//       calcOutput: "",
//       socket: {
//         connected: false,
//         connectionId: ""
//       }
//     };
//   }

//   initSocket = () => {
//     const socket = io(socketUrl);
//     socket.on("connect", () => {
//       this.setState({ socket }, () => {});
//       socket.emit("calc", { calcInput: this.state.calcInput });
//       socket.on("calc", data =>
//         this.setState({ calcOutput: data.calcOutput }, () => {})
//       );
//     });
//     socket.on("disconnect", () => this.setState({ socket }, () => {}));
//   };

//   handleInputChange = e => {
//     this.setState({ calcInput: e.target.value }, () => {});
//   };

//   componentDidMount = () => {
//     this.initSocket();
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.calcInput !== prevState.calcInput) {
//       const { socket } = this.state;
//       if (socket.connected) {
//         socket.emit("calc", { calcInput: this.state.calcInput });
//         socket.on("calc", data =>
//           this.setState({ calcOutput: data.calcOutput }, () => {})
//         );
//       }
//     }
//   }

//   componentWillUnmount() {
//     this.state.socket.on("disconnect", () => {});
//   }

//   render() {
//     return (
//       <OuterWrapper>
//         <Container>
//           <InnerWrapper>
//             {connectionStatus(this.state.socket)}
//             <TextField
//               error={this.state.calcOutput === 'NaN'}
//               onChange={this.handleInputChange}
//               value={this.state.calcInput}
//               label='Выражение'
//               fullWidth
//               autoFocus
//             />
//             <EqualSign />
//             <Output>
//               {this.state.calcOutput !== ''
//                 ? (this.state.calcOutput === 'NaN' && 'Неверный ввод') ||
//                   (this.state.calcOutput === 'Infinity' &&
//                     String.fromCharCode(8734)) ||
//                   this.state.calcOutput
//                 : 'Результат'}
//             </Output>
//           </InnerWrapper>
//         </Container>
//       </OuterWrapper>
//     );
//   }
// }
const socketUrl = process.env.NODE_ENV === 'production' ? 'http://serviceorientedarchitectureslab1-env.rjimemfqik.eu-central-1.elasticbeanstalk.com' : 'http://localhost:4000';
const socket = io(socketUrl);
socket.open();

const App: React.FC = () => {
  const [connectionId, setConnectionId] = useState<string | undefined>(undefined);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<[string, number][]>([]);
  useEffect(() => {
    socket.emit('countWords', { input });
    socket.on('countWords', ({ output }: { output: [string, number][] }) => setOutput(output))
    socket.on('connect', () => {
      console.log('connected, socket id: ', socket.id);
      setConnectionId(socket.id);
    });
    return () => {
      socket.emit('disconnect', () => { });
    };
  }, [input]);

  return (
    <div className="App">
      <div>Connection id: {connectionId ? connectionId : 'undefined'}</div>
      <textarea onChange={e => setInput(e.target.value)}></textarea>
      <div>{output.map((entry) => {
        const key = entry[0]
        const value = entry[1]
        return <div>{key}: {value}</div>
      })}</div>
    </div>
  );
}

export default App;
