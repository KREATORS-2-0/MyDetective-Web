import io from "socket.io-client";

const socket = io(
  "http://ec2-15-223-56-147.ca-central-1.compute.amazonaws.com:8080"
);

export default socket;
