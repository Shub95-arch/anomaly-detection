# Anomaly Detection System

This project is an anomaly detection system built using Node.js that interfaces with a Python-based anomaly detection API. The system is capable of detecting anomalies in various data types such as company sales, server logs, and financial reports. It stores the last 50,000 data chunks it has processed to maintain context and improve detection accuracy.

The service is hosted at [here](https://anomaly.securenet.fun).

## Features

- Detects anomalies in:
  - Company sales data
  - Server logs
  - Financial reports
- Remembers the last 50,000 chunks of processed data for improved anomaly detection.
- API integration with a Python anomaly detection model.
- Real-time processing and anomaly identification.

## Installation

### Requirements

- Node.js (v14.x or higher)
- Python (v3.x or higher)
- Access to the Anomaly Detection API (running in Python)

### Local Setup

1. **Clone the repository**:

   ```bash
   https://github.com/Shub95-arch/anomaly-detection.git
   cd anomaly-detection-nodejs
