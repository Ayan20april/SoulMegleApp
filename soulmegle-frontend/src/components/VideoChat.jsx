import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const VideoChat = ({ userId }) => {
    const [peerId, setPeerId] = useState("");
    const [remotePeerId, setRemotePeerId] = useState("");
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (id) => setPeerId(id));

        peer.on("call", (call) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                myVideoRef.current.srcObject = stream;
                call.answer(stream);
                call.on("stream", (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                });
            });
        });

        peerInstance.current = peer;
    }, []);

    const callPeer = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            myVideoRef.current.srcObject = stream;
            const call = peerInstance.current.call(remotePeerId, stream);
            call.on("stream", (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
            });
        });
    };

    return (
        <div>
            <h2>Video Chat</h2>
            <p>Your Peer ID: {peerId}</p>
            <input
                type="text"
                placeholder="Enter remote peer ID"
                value={remotePeerId}
                onChange={(e) => setRemotePeerId(e.target.value)}
            />
            <button onClick={callPeer}>Call</button>
            <div>
                <video ref={myVideoRef} autoPlay playsInline />
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>
        </div>
    );
};

export default VideoChat;
