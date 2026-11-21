# Portal Universitario UNEZ · Módulo AulaCheck

**Versión actual:** `v0.7.0` (Versión previa a conexión de Base de Datos)  
**Institución:** Universidad Emiliano Zapata (UNEZ) — Turno Nocturno (`N1–N6`, 18:00 a 21:50 hrs)

---

## ¿Qué es AulaCheck?

**AulaCheck** es un módulo integrado dentro del portal universitario pensado para resolver un problema real del turno nocturno: evitar que alumnos y docentes suban pisos sin elevador (o hagan filas largas en elevadores) buscando un salón disponible.

Desde una sola pantalla permite consultar en tiempo real qué aulas están **Libres**, **Ocupadas**, **Reservadas** o en **Mantenimiento** en los edificios **800, 700 y 900**, ver su ubicación exacta en un **Mapa de pisos**, consultar horarios de oficinas y gestionar los horarios oficiales de todo el turno nocturno.

---

## Roles del sistema

1. **Estudiante**
   - Consulta su horario personal (*Mi Horario*), aulas libres en el bloque actual y su ubicación en el mapa de pisos (con prioridad automática a pisos bajos P1–P2).
   - Visualiza horarios de oficinas de atención nocturna y puntos de reunión.
2. **Docente**
   - Consulta disponibilidad de aulas y puede solicitar **Reservar** un salón libre o **Liberar** un salón que desocupará antes de tiempo.
   - Cumple la regla operativa de **20 minutos de anticipación** antes del inicio del bloque, sujeta a aprobación de Prefectura.
3. **Prefectura**
   - Realiza rondines físicos para confirmar o corregir el estado real de los salones.
   - Aprueba o rechaza en tiempo real las solicitudes de los docentes.
   - Activa o reporta en mantenimiento los elevadores (Edificio 800: E1 y E2; Edificio 700: elevador único) y registra todo en bitácora.
4. **Administrador (Dirección de Control Escolar)**
   - Cuenta con las mismas funciones operativas de Prefectura y añade la pestaña **Gestión Visual (Admin)**.
   - Permite ver el tablero semanal completo por **Grupo (39 grupos)** o por **Salón**, agregar o eliminar clases con aviso previo de conflictos, auditar traslapos automáticamente y trabajar con **Excel** (descargar plantilla oficial `.xlsx`, importar horarios hechos a distancia con revisión anti-traslapos y exportar la base en `.xlsx`, `.csv` o `.json`).

---

## Estructura de ramas en Git

Para proteger la versión funcional previa a la base de datos:

* **`main` (Etiqueta `v0.7.0`):** Rama principal estable previa a base de datos. Contiene el sistema completo funcionando con los 771 bloques del turno nocturno y carga/descarga de Excel.
* **`pruebas`:** Rama copia de `main` creada específicamente para realizar pruebas, experimentos y preparar la conexión futura a la base de datos (`v1.0.0-alpha.1`) sin afectar la versión estable.

---

## Requisitos para ejecutar en computadora local (Referencia técnica)

1. Tener instalado **Node.js** (versión 18 o superior).
2. Abrir la carpeta del proyecto en una terminal o desde **Visual Studio Code**.
3. Instalar dependencias y arrancar el servidor local:
   ```bash
   npm install
   npm run dev
   ```
4. Abrir el navegador en `http://localhost:3000`.
