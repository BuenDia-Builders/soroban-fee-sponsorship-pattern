import { Router, Request, Response } from 'express';
import * as StellarSdk from '@stellar/stellar-sdk';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { innerXdr } = req.body;
    
    if (!innerXdr) {
      return res.status(400).json({ error: 'innerXdr is required' });
    }

    const networkPassphrase = process.env.NETWORK_PASSPHRASE!;
    const sponsorSecret = process.env.SPONSOR_SECRET_KEY!;
    const horizonUrl = process.env.HORIZON_URL!;

    // Decode inner transaction from XDR
    const innerTx = StellarSdk.TransactionBuilder.fromXDR(innerXdr, networkPassphrase);

    // Create fee-bump wrapping the inner tx
    const feeBumpTx = StellarSdk.TransactionBuilder.buildFeeBumpTransaction(
      StellarSdk.Keypair.fromSecret(sponsorSecret),
      '1000000', // base fee in stroops
      innerTx as StellarSdk.Transaction,
      networkPassphrase
    );

    // Sign with sponsor key
    feeBumpTx.sign(StellarSdk.Keypair.fromSecret(sponsorSecret));

    // Submit to network
    const server = new StellarSdk.Horizon.Server(horizonUrl);
    const result = await server.submitTransaction(feeBumpTx);

    console.log('Transaction submitted:', result.hash);
    res.json({ hash: result.hash });

  } catch (error: any) {
    console.error('Relay error:', error.message || error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

export default router;
