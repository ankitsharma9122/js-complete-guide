
```js
Application (HTTP, HTTPS, WebSocket, DNS)
Transport (TCP / UDP) 
Network (IP)
```

## TCP (Transmission Control Protocol)

* Reliable, connection-oriented protocol with **guaranteed and ordered delivery**
* Uses **3-way handshake** (SYN → SYN-ACK → ACK)
* Retransmits lost packets and performs error checking
* Slower due to reliability overhead
* Used by **HTTP/HTTPS, APIs, file downloads, WebSockets**

---

## UDP (User Datagram Protocol)

* **Connectionless and unreliable**, no guarantee of delivery or order
* No handshake, no retransmission → **very low latency**
* Faster and lightweight compared to TCP
* Packet loss is acceptable
* Used by **DNS, WebRTC, video/audio streaming, online gaming**

---

## TCP vs UDP (One-line Comparison)

* **TCP = Reliability first**, **UDP = Speed first**

---

