# Consideraciones de Seguridad

## Para el Relayer

### Verificación de Firmas
- Siempre verificar la firma del usuario antes de construir la transacción
- Implementar replay protection (nonces o timestamps)
- Validar que la intención no haya expirado

### Rate Limiting
- Implementar límites para prevenir abuso
- Monitorear patrones sospechosos de uso

### Fondos del Sponsor
- No mantener excesivos fondos en la cuenta sponsor
- Considerar multi-sig para la cuenta sponsor
- Monitorear balances y reponer fondos automáticamente

## Para el Usuario

### Scope de la Firma
- La firma debe estar limitada a operaciones específicas
- Evitar firmas en blanco que permitan cualquier operación
- Usar `TlB` (Transaction Builder) con restricciones claras

### Front-Running
- Las intenciones firmadas pueden ser vistas por el relayer
- Para casos de uso sensibles, considerar protección adicional

## Consideraciones Generales

### Trusted Relayer
- El relayer es un punto de falla centralizado
- Elegir relayers confiables o ejecutar uno propio
- Considerar relayers descentralizados en el futuro

### Datos Públicos
- Todas las transacciones en Stellar son públicas
- No incluir datos sensibles en las intenciones firmadas

### Replay Protection
- Incluir nonce o timestamp en las intenciones
- El relayer debe mantener registro de intenciones usadas
