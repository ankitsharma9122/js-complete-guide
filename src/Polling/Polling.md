# Polling and Webhooks

## 1. SHORT POLLING

### Definition

Client repeatedly sends HTTP requests at fixed intervals to check for updates, regardless of data availability.

### Mechanism

```
Client Request → Server Response (Immediate) → Connection Close → Wait Interval → Repeat
```

### Flow Diagram

```
Client                    Server
  |                         |
  |------ Request --------->|
  |<----- Response ---------|
  |                         |
  |--- Wait 5 seconds ----  |
  |                         |
  |------ Request --------->|
  |<----- Response ---------|
  |                         |
```

### Key Characteristics

* **Pattern**: Fixed-interval requests
* **Connection**: Short-lived (one req-res cycle)
* **Latency**: Equals polling interval (e.g., 5s)
* **Data Retrieval**: Pull model (client initiates)

### Implementation Example

```javascript
// CLIENT-SIDE: Short Polling
function shortPoll() {
  setInterval(async () => {
    const response = await fetch('/api/updates');
    const data = await response.json();
    
    if (data.newMessages) {
      updateUI(data.messages);
    }
  }, 5000); // Poll every 5 seconds
}
```

```javascript
// SERVER-SIDE: Express.js
app.get('/api/updates', (req, res) => {
  const updates = checkForUpdates();
  res.json({ newMessages: updates.length > 0, messages: updates });
});
```

### Pros & Cons

**Advantages**

* Simple implementation
* Stateless

**Disadvantages**

* High server load (constant requests)
* Wasted bandwidth (empty responses)

### Best Use Cases

* Non-critical real-time needs
* Simple dashboards

---

## 2. LONG POLLING

### Definition

Long polling is an HTTP-based technique where the client sends a request and the server holds the connection open until new data is available or a timeout occurs.

### Mechanism

```
Client Request → Server Waits → Data Available or Timeout → Server Response → Client Re-requests if needed
```

### Flow Diagram

```
Client                    Server
  |                         |
  |------ Request --------->|
  |                         |  (waits)
  |                         |  (event occurs)
  |<----- Response ---------|
  |------ Request --------->|
  |                         |  (waits again)
```

### Key Characteristics

* **Pattern**: Event-driven with retry
* **Connection**: Long-lived until response
* **Latency**: Near real-time (depends on event)
* **Data Retrieval**: Pull model with delayed response

### Implementation Example

```javascript
// CLIENT-SIDE: Long Polling
async function longPoll() {
  const response = await fetch('/api/long-updates');
  const data = await response.json();

  updateUI(data);

  if (!data.isFinal) {
    longPoll(); // re-initiate after response
  }
}

longPoll();
```

```javascript
// SERVER-SIDE: Express.js
app.get('/api/long-updates', async (req, res) => {
  const startTime = Date.now();
  const TIMEOUT = 30000; // 30 seconds

  while (Date.now() - startTime < TIMEOUT) {
    const update = checkForUpdates();
    if (update) {
      return res.json(update);
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  res.json({ status: 'PENDING' });
});
```

### Pros & Cons

**Advantages**

* Reduced number of requests
* Near real-time updates

**Disadvantages**

* Server resources held longer
* More complex than short polling

### Best Use Cases

* KYC / OTP / payment status
* Background job tracking

---

## 3. WEBHOOKS

### Definition

A webhook is a server-to-server HTTP callback where one system automatically notifies another system when an event occurs.

### Mechanism

```
Event Occurs → Provider Sends HTTP POST → Consumer Processes Event → Responds 200 OK
```

### Flow Diagram

```
Event Source            Your Server
     |                       |
     |---- POST Webhook ---->|
     |<--- 200 OK -----------|
```

### Key Characteristics

* **Pattern**: Event push
* **Connection**: Short-lived
* **Latency**: Real-time
* **Data Retrieval**: Push model (server initiates)

### Implementation Example

```javascript
// SERVER-SIDE: Webhook Receiver
app.post('/webhook/event', express.json(), (req, res) => {
  const event = req.body;

  handleEvent(event);

  // Acknowledge receipt
  res.sendStatus(200);
});
```

```javascript
function handleEvent(event) {
  if (event.status === 'SUCCESS') {
    // update database
  }
}
```

### Pros & Cons

**Advantages**

* No polling required
* Highly efficient
* Real-time notifications

**Disadvantages**

* Requires public endpoint
* Needs security (signature verification)

### Best Use Cases

* Payment gateways (Stripe, Razorpay)
* KYC provider callbacks
* Order and delivery events

---

## Summary Comparison

| Feature          | Short Polling | Long Polling    | Webhooks                |
| ---------------- | ------------- | --------------- | ----------------------- |
| Model            | Pull          | Pull (delayed)  | Push                    |
| Real-time        | ❌             | ✅ (near)        | ✅                       |
| Browser Friendly | ✅             | ✅               | ❌                       |
| Server Load      | High          | Medium          | Low                     |
| Typical Usage    | Dashboards    | Status tracking | System-to-system events |
