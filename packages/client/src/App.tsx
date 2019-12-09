import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socketUrl =
  process.env.NODE_ENV === "production"
    ? "ws://serviceorientedarchitectureslab1-env.rjimemfqik.eu-central-1.elasticbeanstalk.com"
    : "http://localhost:4000";
const socket = io(socketUrl);
socket.open();

const App: React.FC = () => {
  const [connectionId, setConnectionId] = useState<string | undefined>(
    undefined
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<[string, number][]>([]);
  useEffect(() => {
    socket.emit("countWords", { input });
    socket.on("countWords", ({ output }: { output: [string, number][] }) =>
      setOutput(output)
    );
    socket.on("connect", () => {
      console.log("connected, socket id: ", socket.id);
      setConnectionId(socket.id);
    });
    return () => {
      socket.emit("disconnect", () => {});
      // setConnectionId(undefined);
    };
  }, [input]);

  return (
    <div className="App">
      <div>{socketUrl}</div>
      <div>Connection id: {connectionId ? connectionId : "undefined"}</div>
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        {output.map((entry) => {
          const key = entry[0];
          const value = entry[1];
          return (
            <div>
              {key}: {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
