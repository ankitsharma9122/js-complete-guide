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
- **Pattern**: Fixed-interval requests
- **Connection**: Short-lived (one req-res cycle)
- **Latency**: Equals polling interval (e.g., 5s)
- **Data Retrieval**: Pull model (client initiates)

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
- Simple implementation
- Stateless

 **Disadvantages**
- High server load (constant requests)
- Wasted bandwidth (empty responses)

### Best Use Cases
- Non-critical real-time needs

---
