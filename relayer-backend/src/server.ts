import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import relayRouter from './relay';

const app: Application = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

app.use('/relay', relayRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Relayer backend running on port ${PORT}`);
  console.log(`Network: ${process.env.NETWORK_PASSPHRASE}`);
  console.log(`RPC: ${process.env.SOROBAN_RPC_URL}`);
});
