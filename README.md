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

### User Flow

```
┌─────────────────────────────────────────────┐
│                                     │
│   1. Generate Seed Phrase            │
│      or Import Existing One           │
│                                     │
│   2. Seed Phase Created             │
│      (12 BIP39 Words)               │
│                                     │
│   3. Copy to Clipboard              │
│      (Always Available)               │
│                                     │
│   4. Add More Wallets               │
│      (Optional)                      │
│                                     │
│   5. View/Copy Keys                │
│      Public & Private Keys             │
│                                     │
│   6. Delete Wallets                 │
│      (Individual or All)            │
│                                     │
│   7. Clear All Data                 │
│      (Reset to Beginning)            │
│                                     │
└─────────────────────────────────────────────┘
```

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

### Project Structure

```
web-wallet/
├── app/                      # Next.js app router
│   ├── page.tsx             # Home page (mounted check, screen switching)
│   ├── utils/                # Utility functions
│   │   └── wallet.ts        # Wallet generation, key derivation helpers
│   └── globals.css           # Global styles, Tailwind config
├── components/                # React components
│   ├── SeedPhaseGenScreen.tsx      # Seed phrase generation screen
│   ├── WalletScreen.tsx              # Wallet management screen
│   ├── Wallet.tsx                   # Individual wallet card component
│   ├── SeedPhaseDropdown.tsx         # Collapsible seed phrase (experimental)
│   ├── AlertDialogModal.tsx           # Reusable confirmation dialog
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── collapsible.tsx
│       ├── input.tsx
│       ├── alert-dialog.tsx
│       ├── item.tsx
│       └── ...
├── lib/                      # Utility libraries
│   └── utils.ts           # cn() helper for Tailwind class merging
└── public/                   # Static assets
```

### Setup Guide

#### Prerequisites

- **Node.js**: v18.17 or higher
- **pnpm**: Latest version (recommended)
- **Git**: For version control

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

# Build for production
pnpm run build

# Start production server (after build)
pnpm run start

# Run ESLint
pnpm run lint
```

#### Adding Components

```bash
# Add new shadcn/ui component
pnpm dlx shadcn@latest add [component-name]

# Example: Add Accordion component
pnpm dlx shadcn@latest add accordion

# Example: Add Dialog component
pnpm dlx shadcn@latest add dialog
```

#### Key Files

| File                                | Description                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `app/utils/wallet.ts`               | Core wallet utilities: `seedPhaseGen`, `getPrivatePublicKeyPair` |
| `components/SeedPhaseGenScreen.tsx` | Initial screen - seed phrase generation/import                   |
| `components/WalletScreen.tsx`       | Main screen - wallet list, add/clear actions                     |
| `components/Wallet.tsx`             | Individual wallet card - key display, visibility toggle          |
| `components/SeedPhaseDropdown.tsx`  | Experimental - collapsible seed phrase with animation            |

---

## Security Considerations

> ⚠️ **Important Security Notes**

1. **Seed Phrase Storage**: Stored in `localStorage` (browser-based). Never share your seed phrase!
2. **Private Keys**: Always truncated in UI by default (••••••) until explicitly revealed
3. **HTTPS Required**: Production must use HTTPS for clipboard API on mobile
4. **No Server**: This is a client-side only wallet - no server communication
5. **Custodial**: You have full control - funds are never held by any third party

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Kosh](https://wallet-kosh.vercel.app/) - Inspiration for this project
