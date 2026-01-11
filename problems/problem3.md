# Analysis

### 1. TS & Typing

- `FormattedWalletBalance` should use extends from `WalletBalance`
- why using `balance.blockchain` while `WalletBalance` does not have
- why using `any` type at `blockchain` param.

### 2. Logic

- `lhsPriority` variable is not declared
- if `balance.amount <= 0` then return `true`. Wrong logic
- should implement while `priority` is equal
- the `prices` is one of dependencies inside useMemo but it is not used
- `rows` should memo to memoization
- should sepearted data transform to render UI

### 3. React

- `getPriority` should be added to dependencies array cause its reference always change
- Do not using `index` for `key`. The `index` can be changed hence it will be rendered wrong in React Reconciliation
