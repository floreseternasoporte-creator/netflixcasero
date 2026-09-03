---
name: Coin wallet persistence
description: El saldo y las recompensas deben conservarse por cuenta sin borrar cachés al cerrar sesión.
---

El saldo de monedas debe tener a Firebase como fuente compartida por usuario y conservar un respaldo local identificado por UID. El cierre de sesión solo debe retirar claves de sesión; nunca debe usar `localStorage.clear()` porque también elimina saldos, recompensas y progreso local.

**Why:** El saldo podía aparecer de nuevo como 100 cuando el usuario cambiaba de contexto o cerraba sesión, aunque hubiera reclamado la recompensa.

**How to apply:** Cualquier nueva recompensa, gasto o desbloqueo debe actualizar el monedero sincronizado y su caché local; la interfaz debe mostrar si está sincronizado o funcionando en respaldo local.