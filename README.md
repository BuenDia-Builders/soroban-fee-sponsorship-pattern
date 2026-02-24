# Soroban Fee Sponsorship Pattern

Un patrón neutral y reusable que permite a usuarios de dApps en Soroban ejecutar transacciones sin necesidad de poseer XLM nativo.

## ¿Cómo funciona?

1. **Usuario firma una intención**: El usuario firma una intención de operación (invoke contract, transfer, etc.) con su clave privada. Esta firma no requiere XLM.

2. **Relayer verifica la firma**: Un servicio de relayer recibe la intención firmada, verifica la autenticidad de la firma, y construye una transacción fee-bump.

3. **Pago de fees con cuenta sponsor**: El relayer usa una cuenta sponsor (pre-financiada con XLM) para pagar las fees de la transacción.

4. **Envío a la red Stellar**: El relayer envía la transacción fee-bump a la red Stellar/Soroban.

El usuario **nunca necesita XLM** para pagar fees. Solo necesita tener activos o tokens en el contrato inteligente.

## Estructura del Proyecto

```
├── client-sdk-wrapper/     # SDK para que dApps firmen intenciones de usuario
├── relayer-backend/        # Servicio que verifica firmas y envía transacciones
├── sample-soroban-contract/ # Contrato de ejemplo para demostrar el patrón
├── demo-app/               # Aplicación demo completa
└── docs/                   # Documentación arquitectónica
```

## Casos de Uso

- dApps que no quieren que sus usuarios tengan que comprar XLM
- Onboarding simplificado para nuevos usuarios
- aplicaciones DeFi en Soroban
- NFT marketplaces
- Cualquier aplicación que requiera transacciones frecuentes

## Estado

Este es un proyecto open source en desarrollo. Consulta los docs para más detalles sobre arquitectura y consideraciones de seguridad.
