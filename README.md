# Soroban Relay Pattern

**Gasless UX for Stellar — users sign, relayers sponsor.**

*Neutral • Reusable • Zero vendor lock-in*

> Stellar fees are already cheap. The real pain is **onboarding friction**:
> _"Fund your wallet with XLM"_ → user drops.
>
> This pattern eliminates that. The user authorizes, the relayer sponsors, the network executes.

## Overview

A minimal, open-source pattern for **relayed Soroban invocations** using native fee-bump transactions. Users can execute smart contract calls **without needing to acquire XLM beforehand**.

> **This is not a hosted service.**
> This is a reference implementation — you can self-host, fork, extend, or productize it.

## How It Works

```
┌──────────────┐     sign      ┌──────────────┐    fee-bump    ┌──────────────┐
│     User     │──────────────▶│    Relayer    │───────────────▶│   Stellar    │
│  (no XLM)    │   intention   │   (sponsor)  │   submit tx    │   Network    │
└──────────────┘               └──────────────┘                └──────────────┘
```

1. **User signs an intention** — The user signs the authorization payload with their wallet. No XLM required.
2. **Relayer verifies + wraps** — Receives the signed XDR, verifies it, and wraps it in a native fee-bump transaction.
3. **Sponsor pays** — Signs the fee-bump with a pre-funded sponsor account and submits.
4. **Hash returned** — The user gets a transaction hash back. Done.

**Fees exist — but the user doesn't feel them.**

## Project Structure

```
├── client-sdk-wrapper/     # TypeScript SDK for dApps
├── relayer-backend/        # Node.js relayer — fee-bump + submit
├── sample-soroban-contract/# Soroban counter contract
├── demo-app/               # Next.js demo — click → txHash
└── docs/                   # Architecture, security, guidance
```

## Why Stellar for Gasless?

| | Stellar | Ethereum |
| --- | --- | --- |
| **Fees** | ~0.00001 XLM | $1-50+ |
| **Fee-bump** | Native protocol feature | Requires ERC-4337 + bundlers |
| **Infrastructure** | Relayer only | Paymaster + bundler + entry point |
| **Complexity** | Low | High |

## Roadmap

- [x] Repo structure + documentation
- [x] Relayer backend with fee-bump logic
- [ ] Client SDK wrapper (`GaslessInvoker`)
- [ ] Sample Soroban contract (counter)
- [ ] Demo app (click → txHash)
- [ ] Deploy relayer + demo
- [ ] Multi-sponsor rotation
- [ ] Nonce + domain separation
- [ ] Simulation + fee estimation

## Related Projects

| Project | Approach |
| --- | --- |
| [Dfns Launchtube](https://dfns.co) | Wallet-as-a-Service with fee sponsorship |
| [SocketFi](https://socketfi.com) | Non-custodial wallet with gas abstraction |
| [UltravioletaDAO](https://ultravioletadao.xyz) | Gasless USDC payments via fee-bump |
| [Accesly](https://accesly.vercel.app) | Social login + gasless onboarding SDK |

This repo provides the **neutral, reusable pattern** that any of these can build upon.

---

**Built with ❤️ by [BuenDia Builders](https://github.com/BuenDia-Builders)**
