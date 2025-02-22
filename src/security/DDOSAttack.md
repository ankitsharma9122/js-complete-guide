## DDOS
A DDoS attack is when multiple compromised systems (often part of a botnet) flood a target system, service, or network with excessive traffic, causing disruptions, slowdowns, or total unavailability.

**Types of DDoS Attacks Volume-Based Attacks :**

1. Volume-Based Attacks :           
Attackers send an overwhelming amount of traffic in form of UDP packets to specfic port to saturate the network, making the service unreachable.

Examples: UDP Flood.

2. Protocol-Based Attacks :                      
These attacks exploit weaknesses in network protocols to consume CPU, memory, or connection limits.

Examples: SYN Flood : Attackers send a massive number of SYN (synchronize) requests to a target server but never complete the connection, causing the server to use up its resources and eventually become unresponsive.

3. Application Layer Attacks:    
Attackers send seemingly legitimate requests that force the application to use excessive processing power, slowing or crashing it.

Examples: HTTP Flood

## How to Prevent DDoS Attacks
 1. Rate Limiting: Restrict the number of requests per second from a single IP.
2. Traffic Filtering: Block known malicious IPs and suspicious patterns.
3. Disable Unused Services: Reduce exposure by closing unnecessary ports and disabling unused protocols.
4. Firewalls & IDS/IPS: Use Web Application Firewalls (WAFs) and Intrusion Prevention Systems (IPS) to detect and block unusual traffic.