import SockJS from 'sockjs-client';
import {Client, over} from 'stompjs';
import {SERVER_ADDRESS} from '../constants/SystemConstant';

export function getStompClient(): Client {
  // Tạo một kết nối SockJS đến máy chủ WebSocket
  const socket = new SockJS(SERVER_ADDRESS + 'tdc-social-network-ws');

  // Tạo một client Stomp sử dụng kết nối SockJS
  const stompClient = over(socket);

  // Trả về client Stomp đã tạo
  return stompClient;
}
