# AGENTS.md - Codebase Guidelines

## Project Overview

**Type**: Next.js 16.1.6 Web Application (Solana Wallet)
**Framework**: React 19.2.3 with TypeScript 5
**Styling**: Tailwind CSS v4 + shadcn/ui components
**Build System**: Next.js (Turbopack)
**Linting**: ESLint with `eslint-config-next` configuration

**Structure**:
- `app/` - Next.js app router pages and utilities
- `components/` - Reusable UI components
- `components/ui/` - shadcn/ui base components
- `lib/` - Utility functions

---

## Build / Lint / Test Commands

### Development
```bash
pnpm run dev          # Start Next.js development server
pnpm run build        # Build for production
pnpm run start        # Start production server
```

### Linting
```bash
pnpm run lint         # Run ESLint on all TypeScript/TSX files
```

### Single File Testing
```bash
# Test specific component with TypeScript compiler
npx tsc --noEmit components/Wallet.tsx

# Test specific utility
npx tsc --noEmit app/utils/wallet.ts

# Lint specific file
npx eslint components/Wallet.tsx
```

### Type Checking
```bash
# Full type check (configured in tsconfig.json)
npx tsc --noEmit
```

---

## Code Style Guidelines

### Imports

#### DO
- Use absolute imports for components: `import { Component } from "@/components/ui/..."`
- Use absolute imports for utils: `import { function } from "@/app/utils/..."`
- Group imports: React hooks first, then external libraries, then local imports
- Use named exports from shadcn/ui components

```typescript
// ✅ CORRECT
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getPrivatePublicKeyPair } from "@/app/utils/wallet";

// ✅ CORRECT - Grouped imports
import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { Button } from "@/components/ui/button";
```

#### DON'T
- Don't use relative imports from app directory: `import { X } from "../../components/..."`
- Don't mix import styles (keep all imports together at top)

---

### Formatting

#### Use `prettier` for formatting (if installed)
```bash
npm run lint  # Often includes format checking
npx prettier --write "components/**/*.{ts,tsx}"
npx prettier --write "app/**/*.{ts,tsx}"
```

#### Indentation
- **2 spaces** for indentation (no tabs)
- Consistent indentation for JSX and TypeScript

#### Line Length
- Keep lines **under 100 characters** when possible
- Break long lines for readability
- Import statements: Keep imports under 100 chars or break across multiple lines

#### Trailing Whitespace
- Remove all trailing whitespace
- One blank line between functions/components

---

### TypeScript Types

#### DO
- **Always type function parameters**
- **Always type return values**
- Use interfaces for component props
- Use type definitions for complex objects
- Use `typeof` for type guards when needed
- Use `Array<T>` instead of just `Array<T>` when not needed

```typescript
// ✅ CORRECT
interface WalletType {
  privateKey: string;
  publicKey: string;
  mnemonic: string;
  path: string;
}

export const getPrivatePublicKeyPair = (path: string, seed: Buffer) => {
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();
  const base58PrivateKey = bs58.encode(privateKey);
  return { privateKey: base58PrivateKey, publicKey };
};

// ✅ CORRECT
const [wallets, setWallets] = useState<WalletType[]>([]);
const [wallets, setWallets] = useState<Array<Wallet>>([]); // Less common but acceptable
```

#### DON'T
- Don't use `any` type (unless absolutely necessary)
- Don't use implicit any from `@ts-ignore` comments (rarely needed)
- Don't skip type parameters

```typescript
// ❌ AVOID
function process(data: any) { ... }  // Use specific type
function handle(data: any) { ... }  // Define interface/interface
```

---

### Naming Conventions

#### Files
- **Components**: PascalCase (e.g., `WalletScreen.tsx`, `Wallet.tsx`, `SeedPhaseGenScreen.tsx`)
- **Utilities**: camelCase (e.g., `wallet.ts` for functions)
- **Constants**: SCREAMING_SNAKE_CASE (if creating constant files)
- **Types**: PascalCase interfaces (e.g., `WalletType`)

#### Variables & Functions
- **camelCase** for variables and functions
- **PascalCase** for React components
- **SCREAMING_SNAKE_CASE** for constants

```typescript
// ✅ CORRECT
const [wallets, setWallets] = useState<WalletType[]>([]);
const handleDeleteWallet = () => { ... };
const MAX_WALLETS = 10;

interface WalletType { ... }
function WalletScreen() { ... }

// ❌ AVOID
const Wallet_Screen = () => { ... };  // Don't use underscores
const [Wallets, SetWallets] = useState([]);  // Don't use Pascal for state
function handleDelete_wallet = () => { ... };  // Don't use underscores
```

#### Event Handlers
- Prefix with `handle` for user interaction functions
- Use descriptive names: `handleClick`, `handleSubmit`, `handleDelete`

```typescript
// ✅ CORRECT
const handleCopy = async (key: "publicKey" | "privateKey") => { ... };
const addWalletHandler = () => { ... };
const clearWalletsHandler = () => { ... };
```

---

### Error Handling

#### ALWAYS use try-catch for:
- Browser API calls (localStorage, clipboard, fetch)
- Crypto operations (wallet generation, key derivation)
- External library calls that might throw

```typescript
// ✅ CORRECT
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(seedPhase);
    toast.success("Copied to clipboard");
  } catch (error) {
    console.error("Copy failed: ", error);
    toast.error("Failed to copy to clipboard");
  }
};
```

#### ALWAYS use try-catch for localStorage operations:
- Reading might fail (quota exceeded, disabled)
- Writing might fail (quota exceeded, private mode)

```typescript
// ✅ CORRECT
useEffect(() => {
  try {
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
    setWallets(wallets);
  } catch (error) {
    console.error("Failed to load wallets:", error);
    toast.error("Failed to load wallets");
  }
}, []);
```

#### NEVER silently catch errors:
- Always log errors to console
- Always show user feedback (toast, alert, inline error)
- Don't use empty catch blocks

---

### Component Structure

#### Functional Components
- Use TypeScript interfaces for props
- Use `React.Dispatch<React.SetStateAction<T>>` for setters
- Return JSX from functional components
- Use early returns for loading/error states

```typescript
// ✅ CORRECT
interface WalletProps {
  privateKey: string;
  publicKey: string;
  titleIndex: number;
  wallets: WalletType[];
  setWallets: React.Dispatch<React.SetStateAction<WalletType[]>>;
}

export default function Wallet({ publicKey, privateKey, titleIndex, wallets, setWallets }: WalletProps) {
  const [mounted, setMounted] = useState(false);

  if (!mounted) return <div className="min-h-screen"></div>;

  return (
    <div className="...">
      {/* JSX content */}
    </div>
  );
}
```

#### State Updates
- Use functional updates when depending on previous state
- Update state AND localStorage together (or handle failure)
- Never mutate state directly

```typescript
// ✅ CORRECT - Functional update
setWallets((prev) => [...prev, newWallet]);

// ❌ AVOID - Direct mutation with array read
const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");
wallets.push(newWallet);
localStorage.setItem("wallets", JSON.stringify(wallets));
```

#### Conditional Rendering
- Use early returns for loading states
- Use ternary operators for simple conditions
- Use guards for optional values

```typescript
// ✅ CORRECT
if (!mounted) return <div className="min-h-screen"></div>;

{!seedPhase ? <SeedPhaseGenScreen /> : <WalletScreen />}

{wallets.map((wallet) => (
  <Wallet key={wallet.publicKey} {...wallet} />
))}
```

---

### State Management

#### DO
- Use `useState` for local component state
- Use `useEffect` for side effects (localStorage reading, subscriptions)
- Always synchronize localStorage updates with React state
- Use proper TypeScript types for state

```typescript
// ✅ CORRECT
const [wallets, setWallets] = useState<WalletType[]>([]);

useEffect(() => {
  const savedWallets = JSON.parse(localStorage.getItem("wallets") || "[]");
  setWallets(savedWallets);
}, []);
```

#### DON'T
- Don't mutate state directly
- Don't call setters outside of React lifecycle (in callbacks, timers, etc.)
- Don't store complex objects in state if they can be derived

---

### Security Considerations

#### NEVER expose private keys in logs or errors
- Don't log private keys to console
- Don't include private keys in error messages
- Don't send private keys to external APIs (except intended crypto operations)

```typescript
// ❌ AVOID
console.log("Private key:", privateKey);  // DANGEROUS
console.error("Error with key:", privateKey);  // DANGEROUS

// ✅ CORRECT
console.error("Wallet operation failed");  // No sensitive data
```

#### ALWAYS validate before using user input
- Validate mnemonics before generating wallets
- Validate derivation paths before deriving keys
- Sanitize user input from fields

#### Clear sensitive data on logout/reset
- Clear localStorage for wallet data
- Clear state for sensitive information

---

### Wallet-Specific Guidelines

#### Derivation Paths
- Use standard Solana BIP44 path: `m/44'/501'/{accountIndex}'/0'`
- All segments must be hardened (include apostrophe)
- Account index should come from state/localStorage, not hardcoded

```typescript
// ✅ CORRECT
const pathIndex = parseInt(localStorage.getItem("next-wallet-path-index") || "0");
const solanaDerivationPath = `m/44'/501'/${pathIndex}'/0'`;

// ❌ AVOID
const solanaDerivationPath = `m/44'/501'/0'/0'`;  // Hardcoded index
const solanaDerivationPath = `m/44'/501'/0'/0`;     // Missing hardened marker
```

#### Key Management
- Store private keys in localStorage (user's choice, but warn about security)
- Always truncate/obfuscate private keys in UI by default
- Provide clear copy-to-clipboard functionality with feedback
- Never show full private keys without user action

---

### React Best Practices

#### Client Components
- Always add `"use client";` at the very top (first line)
- No other code before the directive
- No comments or blank lines before the directive

```typescript
// ✅ CORRECT
"use client";

import { useState } from "react";
export default function Component() { ... }

// ❌ AVOID
"use-client";  // Wrong format (should have space)
"use-client";
  // Blank line
import { useState } from "react";

// ❌ AVOID
import { useState } from "react";
"use client";
```

#### Cleanup in useEffect
- Always return cleanup functions from `useEffect`
- Clear timers, event listeners, subscriptions

```typescript
// ✅ CORRECT
useEffect(() => {
  const handler = () => { ... };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

#### Key Props
- Always provide `key` prop when rendering lists
- Use stable keys (not array indices when possible)

```typescript
// ✅ CORRECT - Using publicKey as key (unique and stable)
{wallets.map((wallet) => (
  <Wallet key={wallet.publicKey} {...wallet} />
))}

// ⚠️ ACCEPTABLE but less ideal - Using array index
{wallets.map((wallet, index) => (
  <Wallet key={index} {...wallet} />
))}
```

---

### Performance Considerations

#### Memoization
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed to children

```typescript
// ✅ CORRECT
const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);

const memoizedHandler = useCallback(() => { ... }, [dependencies]);
```

#### Lazy Loading
- Code-split large components when using Next.js
- Use dynamic imports for large libraries

---

### Testing (Manual Testing)

Since no automated test framework is configured:

#### Manual Testing Checklist
1. Test wallet creation from seed phrase
2. Test multiple wallet creation (incrementing indices)
3. Test wallet deletion
4. Test private/public key copying
5. Test private key visibility toggle
6. Test localStorage persistence across page reloads
7. Test responsive design on mobile/desktop
8. Test edge cases: empty localStorage, corrupted data

#### Testing Commands
```bash
# Type check entire codebase
npx tsc --noEmit

# Lint entire codebase
pnpm run lint

# Test specific component flow
# 1. Start dev server
# 2. Open browser to localhost:3000
# 3. Manually test each feature
```

---

## Known Issues to Fix

### Critical (Fix Immediately)
1. **Clear Wallets button non-functional**: Button exists but needs onClick handler verification
2. **Hardcoded Wallet Index**: SeedPhaseGenScreen uses `pathIndex = 0`, causing duplicate wallets
3. **Array Mutation**: SeedPhaseGenScreen mutates localStorage array directly instead of using state management properly

### High Priority (Fix Soon)
4. **Type Redundancy in useState**: `Array<Wallet>` unnecessary, use `Wallet[]` instead
5. **Variable Shadowing in useEffect**: WalletScreen.tsx has `savedWallets` variable shadowing state
6. **No Error Handling in Wallet Creation**: SeedPhaseGenScreen entire wallet creation wrapped in try-catch but doesn't prevent state corruption

### Medium Priority
7. **Console.log left in production**: Remove debug statements or use logger instead
8. **Missing Custom Seed Phase Input**: No way to import existing seed phase
9. **Copy Functionality Incomplete**: Only copies seed phase, not wallet keys
10. **localStorage Sync Inconsistency**: State not synced with localStorage changes

### Low Priority (Improve When You Can)
11. **No Error Boundaries**: No error boundary wrapping - if component crashes, entire app fails
12. **No Export/Backup Functionality**: No way to export wallet data
13. **Icon Naming Inconsistency**: Possibly wrong import name for Trash2Icon
14. **String Conversion Bug**: Unnecessary `.toString()` on number when JSON handles conversion
15. **No Loading States**: SeedPhaseGenScreen has no loading indicator during wallet generation

---

## Good Patterns to Maintain

1. Keypair validation in utility functions - Clean separation of concerns, correct crypto operations
2. Responsive typography scaling - Mobile-first approach with appropriate breakpoints
3. Toast notifications for user feedback - Clear feedback for user actions
4. Private key visibility toggle - Hides sensitive data by default, user-controlled reveal
5. TypeScript interfaces well-defined - Type safety, clear contract

---

## Common Patterns Used in This Codebase

### Shadcn/ui Components
- Use from `@/components/ui/` directory
- Import specific components: `Button`, `Card`, `Input`, etc.
- Use variant prop for different styles

### Toast Notifications
- Use `sonner` library for user feedback
- Always provide success/error feedback for user actions

### Lucide Icons
- Import from `lucide-react`
- Use consistent sizing with `size` prop (16, 20, etc.)

### Storage Pattern
- Use `localStorage` for persistence
- Always sync with React state
- Use JSON.stringify/parse for object storage

---

## File Organization

### Create Component Files
- One component per file (or closely related components)
- Name file same as exported component
- Place in `components/` or `components/ui/`

### Create Utility Files
- Place shared utilities in `app/utils/` or `lib/`
- Export functions individually
- Keep utilities focused and reusable

### Page Components
- Place in `app/` directory
- Use page.tsx for root routes
- Keep pages simple, delegate to components

---

## Notes for Agents

### Before Making Changes
1. **Read all related files** to understand context
2. **Search for similar patterns** before introducing new patterns
3. **Ask clarifying questions** when user intent is unclear
4. **Test changes** after implementing (if possible)
5. **Run lint/typecheck** before committing

### When User Requests Complex Features
1. **Break down into smaller steps**
2. **Create a plan first** (don't jump to implementation)
3. **Get user approval** on approach
4. **Implement incrementally** with testing at each step

### Mobile-Specific Considerations
1. **Test clipboard functionality** on actual mobile devices
2. **Test responsive layouts** on various screen sizes
3. **Test touch interactions** (tap vs click)
4. **Verify localStorage behavior** in mobile browsers (private mode, etc.)

---

## Quick Reference

### Common Imports
```typescript
// React hooks
import { useState, useEffect, useMemo, useCallback } from "react";

// Utilities
import { getPrivatePublicKeyPair, seedPhaseGen, WalletType } from "@/app/utils/wallet";

// UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Icons
import { Copy, Delete, Trash } from "lucide-react";

// Crypto
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync, generateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

// Package Installation (use pnpm)
pnpm add <package-name>  # Install a new package
pnpm install          # Install all dependencies
pnpm remove <package-name>   # Remove a package
```

### Common State Patterns
```typescript
// Loading state
const [mounted, setMounted] = useState(false);
const [loading, setLoading] = useState(false);

// Data state
const [wallets, setWallets] = useState<WalletType[]>([]);
const [seedPhase, setSeedPhase] = useState<string | null>(null);

// UI state
const [visible, setVisible] = useState(false);
const [showModal, setShowModal] = useState(false);
```

### Common Error Handling Pattern
```typescript
const handler = async () => {
  try {
    // Operation
    toast.success("Success");
  } catch (error) {
    console.error("Operation failed:", error);
    toast.error("Failed to complete operation");
  }
};
```

---

**Last Updated**: Based on code review on 2025-02-19
