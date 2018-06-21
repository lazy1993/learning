const socket = new WebSocket('ws://127.0.0.1:12010/updates');

socket.onopen = () => {
  setInterval(() => {
    if (socket.bufferedAmount === 0) {
      socket.send(getUpdateData());
    }
  }, 50);
};

socket.onmessage = () => {
  // TODO: event.data
};