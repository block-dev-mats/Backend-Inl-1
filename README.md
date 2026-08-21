# Backend-Inl-1

Ett REST API byggt med Node.js och Express som innehåller en enkel blockkedja. Transaktionerna representerar kaffepartier, och blocken använder SHA-256 samt Proof-of-Work.

## Installation och start

```bash
npm install
npm start
```

Servern körs på `http://localhost:3000`.

## Transaktioner

En transaktion har exakt följande format:

```json
{
  "sender": "Farm A",
  "recipient": "Roastery B",
  "batchId": "COFFEE-001",
  "weightKg": 25
}
```

## Endpoints

- `GET /blockchain` — returnerar hela blockkedjan med status `200`.
- `POST /transactions` — validerar och köar en transaktion med status `201`.
- `POST /mine` — minerar väntande transaktioner och returnerar det nya blocket med status `201`.

Ogiltiga transaktioner returnerar status `400`.

### Exempel: komplett flöde

```bash
curl -X POST http://localhost:3000/transactions -H "Content-Type: application/json" -d '{"sender":"Farm A","recipient":"Roastery B","batchId":"COFFEE-001","weightKg":25}'
curl -X POST http://localhost:3000/mine
curl http://localhost:3000/blockchain
```

## Tester och täckning

```bash
npm test
npm run test:coverage
```

Det finns för närvarande 29 godkända tester. Senast verifierade kodtäckning är:

- Statements: 93.75%
- Branches: 95.83%
- Functions: 94.44%
- Lines: 93.65%

Den konfigurerade miniminivån är 80% för samtliga fyra mått. Svårighetsgraden för Proof-of-Work är `1` när `NODE_ENV === "test"` och annars `2`.

## TDD: red till green

### Transaktion

- Red test: [https://github.com/block-dev-mats/Backend-Inl-1/commit/336a1bdd88bf9cb359c5ba9a47479cd5b68f1d62](https://github.com/block-dev-mats/Backend-Inl-1/commit/336a1bdd88bf9cb359c5ba9a47479cd5b68f1d62)
- Green implementation: [https://github.com/block-dev-mats/Backend-Inl-1/commit/76959a3f20c2449af1edc59307cc61b6cdbcecc1](https://github.com/block-dev-mats/Backend-Inl-1/commit/76959a3f20c2449af1edc59307cc61b6cdbcecc1)

Det röda testet kunde inte importera den saknade transaktionsfunktionen; den gröna implementationen lade till `addTransaction`, som köar transaktionen i listan.

### Hash

- Red test: [https://github.com/block-dev-mats/Backend-Inl-1/commit/65b608f317ea4471301c31befd629ba5143c116f](https://github.com/block-dev-mats/Backend-Inl-1/commit/65b608f317ea4471301c31befd629ba5143c116f)
- Green implementation: [https://github.com/block-dev-mats/Backend-Inl-1/commit/59cf30ca71b713b187c1a796c0ceba3af790afb1](https://github.com/block-dev-mats/Backend-Inl-1/commit/59cf30ca71b713b187c1a796c0ceba3af790afb1)

Det röda testet föll eftersom `Block` saknade metoden `calculateHash`; den gröna implementationen skapade och lagrade en deterministisk SHA-256-hash från blockets innehåll.

### Mining

- Red test: [https://github.com/block-dev-mats/Backend-Inl-1/commit/3e73ed052c68f509baca7ae8c26bf3926858bb91](https://github.com/block-dev-mats/Backend-Inl-1/commit/3e73ed052c68f509baca7ae8c26bf3926858bb91)
- Green implementation: [https://github.com/block-dev-mats/Backend-Inl-1/commit/2a7ac8e8d8e7a1cb38f56ead6bdfe02776e5e71e](https://github.com/block-dev-mats/Backend-Inl-1/commit/2a7ac8e8d8e7a1cb38f56ead6bdfe02776e5e71e)

Det röda testet föll eftersom `Block` saknade metoden `mineBlock`; den gröna implementationen ökade `nonce` och räknade om hashen tills den fick rätt antal inledande nollor.
