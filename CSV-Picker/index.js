const express = require('express');
const { Kafka } = require('kafkajs')

async function clients() {
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['test-kafka-bootstrap.strimzi.svc.cluster.local:9092']
})

const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: 'clients',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()
}

clients()
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);