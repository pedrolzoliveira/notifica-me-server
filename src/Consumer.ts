const amqplib = require('amqplib');

(async () => {
  const queue = 'event-created';
  const conn = await amqplib.connect('amqp://localhost');

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      const contentString = msg.content.toString();
      const lol = JSON.parse(contentString);
      console.log('Recieved:', lol);
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });

  // Sender
  const ch2 = await conn.createChannel();

  setInterval(() => {
    ch2.sendToQueue(queue, Buffer.from(
        JSON.stringify(
            {
                adminId: new Date()
            }
        )
    ));
  }, 1000);
})();
