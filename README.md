<div align="center">

# ⚡ Zenith - Solana Web Wallet

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=FFFFFF)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**Your secure, non-custodial Solana wallet in the browser**

[Live Web App](https://zenith-crypto-wallet.vercel.app/)

</div>

---

## Features

- **Secure Seed Phrase Generation** - Generate new 12-word BIP39 seed phrases or import existing ones
- **Multi-Wallet Support** - Create and manage multiple Solana wallets from a single seed phrase
- **Key Management** - View and copy public/private keys with visibility toggles
- **Dark Mode** - Beautiful dark-themed interface (default)
- **Mobile-First Design** - Responsive UI optimized for mobile devices
- **Local Storage** - All data stored securely in your browser
- **BIP44 Derivation** - Standard Solana derivation path: `m/44'/501'/account'/0'`

---

## Quick Start

### For Users

https://zenith-crypto-wallet.vercel.app/

---

## 📖 User Guide

### Step-by-Step Guide

#### 1. **Generate or Import Seed Phrase**

- **Generate New**: Leave the input blank and click "Generate Wallet" to create a new 12-word seed phrase
- **Import Existing**: Paste your existing BIP39 seed phrase into the input field (words separated by spaces)

> ⚠️ **Important**: Save your seed phrase securely! Never share it with anyone. Anyone with your seed phrase has full access to your wallet.

#### 2. **Copy Seed Phrase**

- Click "Copy to clipboard" button below the seed phrase
- Store it in a secure location (password manager, written in a safe place, etc.)

#### 3. **View Your Wallets**

- After seed phrase is created, your first wallet is automatically generated
- Click "Add Wallet" to create additional wallets from the same seed phrase
- Each wallet uses a different derivation path: `m/44'/501'/0'/0'`, `m/44'/501'/1'/0'`, etc.

#### 4. **View & Copy Keys**

- **Public Key**: Always visible, click to copy
- **Private Key**: Hidden by default (••••••), click eye icon to reveal
- Click on keys to copy them to clipboard

#### 5. **Delete Wallets**

- Click the trash icon on any wallet to delete it individually
- Click "Clear Wallets" to delete all wallets
- You'll be prompted to confirm deletion

#### 6. **Reset Everything**

- Clearing all wallets will prompt to also delete the seed phrase
- This returns you to the beginning (step 1)

#### When you add a new wallet, after deleting a wallet, we will not create that deleted wallet again (just to fill the derivation key gap). We assume you intended to delete the wallet as the wallet was compromised or something.

---

## 🛠️ Developer Guide

### Tech Stack

| Technology         | Version | Purpose                                     |
| ------------------ | ------- | ------------------------------------------- |
| **Next.js**        | 16.1.6  | React framework with App Router & Turbopack |
| **React**          | 19.2.3  | UI library                                  |
| **TypeScript**     | 5.0     | Type safety                                 |
| **Tailwind CSS**   | 4       | Utility-first CSS framework                 |
| **shadcn/ui**      | Latest  | Component library (Radix UI primitives)     |
| **Solana Web3.js** | 1.98.4  | Solana blockchain integration               |
| **BIP39**          | 3.1.0   | Seed phrase generation/validation           |
| **ed25519-hd-key** | 1.3.0   | Key derivation                              |
| **Sonner**         | 2.0.7   | Toast notifications                         |
| **Lucide React**   | Latest  | Icon library                                |

### Setup Guide

#### Installation

```bash
# Clone the repository
git clone https://github.com/Udit8158/zenith-web-crypto-wallet.git
cd zenith-web-crypto-wallet

# Install dependencies
pnpm install
```

#### Development

```bash
# Start development server with hot reload
pnpm run dev
```

---

## Security Considerations

> ⚠️ **Important Security Notes**

1. **Seed Phrase Storage**: Stored in `localStorage` (browser-based). Never share your seed phrase!
2. **Private Keys**: Always truncated in UI by default (••••••) until explicitly revealed
3. **HTTPS Required**: Production must use HTTPS for clipboard API on mobile
4. **No Server**: This is a client-side only wallet - no server communication
5. **Custodial**: You have full control - funds are never held by any third party

---

## Acknowledgments

- [Kosh](https://wallet-kosh.vercel.app/) - Inspiration for this project
