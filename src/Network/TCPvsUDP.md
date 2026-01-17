## Network Stack Overview

```text
Application  → HTTP / HTTPS / WebSocket / DNS
Transport    → TCP (HTTP/1.1, HTTP/2) | UDP (HTTP/3)
Network      → IP
```

---

## TCP (Transmission Control Protocol)

* Reliable, connection-oriented protocol with **guaranteed and ordered delivery**
* Uses **3-way handshake** (SYN → SYN-ACK → ACK)
* Retransmits lost packets and performs error checking
* Slower due to reliability overhead
* Used by **HTTP/HTTPS, REST APIs, file downloads, WebSockets**

---

## UDP (User Datagram Protocol)

* **Connectionless and unreliable**, no guarantee of delivery or order
* No handshake, no retransmission → **very low latency**
* Faster and lightweight compared to TCP
* Packet loss is acceptable
* Used by **DNS, WebRTC, live video/audio streaming, online gaming**

---

## TCP vs UDP (One-line)

* **TCP = Reliability first**
* **UDP = Speed first**

---

## HTTP/1.1

### Characteristics

* Text-based protocol
* Uses **multiple TCP connections** per domain
* **One request at a time per connection**
* Requests are processed sequentially

### Problems

* **Head-of-Line Blocking (HTTP level)**
* Too many TCP connections → more handshakes & congestion

### Common Workarounds (Old Web)

* Bundling JS/CSS
* Image sprites(An image sprite is a collection of various small images put into one larger image file, called a "sprite image".)


---

## HTTP/2

### Characteristics

* **Binary protocol** (faster parsing)
* **Single TCP connection per origin**
* Supports **multiplexing** using streams

### Key Features

* **Multiplexing** – multiple requests/responses in parallel
* **Header Compression (HPACK)** – reduces repeated header size
* **Server Push** – server can push assets proactively
* **Request Prioritization** – critical resources first

---

## HTTP/1.1 vs HTTP/2

| Feature               | HTTP/1.1         | HTTP/2                 |
| --------------------- | ---------------- | ---------------------- |
| TCP Connections       | Multiple         | Single                 |
| Request Handling      | Sequential       | Parallel (Multiplexed) |
| Header Compression    | ❌                | ✅ (HPACK)              |
| Format                | Text             | Binary                 |
| Performance           | Slower           | Faster                 |

---

## Head-of-Line Blocking (Important)

* **HTTP/1.1**: Blocking happens at HTTP layer
* **HTTP/2**: Fixes HTTP blocking but **TCP-level blocking still exists**
* Packet loss in TCP blocks all streams

> This limitation led to **HTTP/3 (QUIC over UDP)**

---

HTTP/2 is still request–response over TCP, while a Socket (WebSocket / TCP socket) is a persistent, bi-directional communication channel.
It allows multiple requests and responses at the same time over a single TCP connection using multiplexing.
