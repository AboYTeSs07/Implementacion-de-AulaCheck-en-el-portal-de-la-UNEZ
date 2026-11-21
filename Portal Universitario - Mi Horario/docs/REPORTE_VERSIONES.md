# Reporte Histórico de Versiones · Portal UNEZ (Módulo AulaCheck)

**Documento de control previo a la integración de Base de Datos**  
**Versión documentada al cierre de etapa:** `v0.7.0`

---

## 1. Resumen Ejecutivo

El proyecto nació con el objetivo de transformar una propuesta documentada por escrito en un módulo funcional dentro del portal universitario de la **Universidad Emiliano Zapata (UNEZ)**. A lo largo de siete etapas incrementales se construyó la identidad visual institucional, se replicó la estructura del portal oficial del alumno, se digitalizaron los edificios, oficinas y salones del campus, se integraron los **39 grupos y 771 bloques horarios reales del turno nocturno** (verificados con **0 traslapos**) y se habilitó un panel completo para **Control Escolar** con soporte de **Excel** sin necesidad todavía de conectar una base de datos externa.

---

## 2. Tabla de Versiones (Convención Oficial del Proyecto)

### Etapa 1: Construcción del Prototipo Funcional (Previo a Base de Datos)

| Etiqueta | Estado del software | Qué ocurrió en esta versión |
| :--- | :--- | :--- |
| `v0.1.0` | Desarrollo inicial | Primer prototipo funcional del proyecto para consulta y visualización de horarios escolares del turno nocturno; base inicial de pantallas y navegación. |
| `v0.2.0` | Identidad visual | Se incorporaron los colores oficiales de la universidad (**rojo, amarillo y negro**) y se agregó un botón estético para cambiar entre tema claro (blanco) y tema oscuro (negro). |
| `v0.3.0` | Estructura del portal oficial | Se adaptó el diseño visual para asemejarse al portal oficial de la UNEZ: barra lateral roja con escudo institucional, ficha del alumno, selector de periodo y tarjetas de Inicio (*Mis Calificaciones*, *Conceptos por pagar*, *Reinscripciones* y el módulo principal renombrado a **AulaCheck**). |
| `v0.4.0` | Prototipo operativo AulaCheck | Se integraron las reglas de operación del turno nocturno (**N1–N6**, 18:00 a 21:50 hrs), el flujo de solicitudes entre **Docente** y **Prefectura** con regla de **20 minutos de anticipación**, el simulador futuro de sensores de presencia y el **Mapa interactivo simplificado** por piso para los edificios **800, 700 y 900**. |
| `v0.5.0` | Ajuste de campus y horarios de áreas | Se organizaron los botones y resúmenes de los edificios conforme al mapa real del campus; se habilitó el despliegue hacia abajo de los 4 menús de Inicio; se corrigió el elevador único del Edificio 700 y se cargaron los horarios reales del turno nocturno para áreas y oficinas (Psicología, Enfermería, Tesorería, Mantenimiento, Coordinación, Dirección, Prefectura, Gym/Medicina, Cafetería y Biblioteca) junto con los puntos de reunión. |
| `v0.5.1` | Corrección rápida (Vista móvil) | Se corrigió la alineación de los cuadros de indicadores y de los botones de rol en la vista de teléfono celular para mantener la interfaz ordenada sin desbordes. |
| `v0.6.0` | Horarios reales y Rol Administrador | Se aplicaron los **39 grupos y 771 bloques horarios reales** del turno nocturno (Lunes a Viernes) desde la programación oficial en PDF, verificando **0 traslapos**. Se añadió el rol **Administrador (Control Escolar)** con acceso completo de Prefectura más una matriz semanal visual por grupo/salón, alta y baja de clases, auditoría automática de traslapos y exportación en CSV y JSON. |
| `v0.7.0` | Nueva función (Cierre previo a BD) | Se añadió la descarga de **Plantilla oficial en Excel (`.xlsx`)** con hoja de instrucciones para trabajo remoto de Control Escolar, exportación directa a **`.xlsx`** e importación de archivos Excel/CSV con **revisión previa de errores y traslapos** antes de aplicar cambios al portal. |

---

### Etapa 2: Hoja de Ruta Planificada (A partir de la Base de Datos)

| Etiqueta | Estado del software | Qué ocurrirá en esa etapa |
| :--- | :--- | :--- |
| `v1.0.0-alpha.1` | Prueba interna | Conexión con la base de datos real e inicio de sesión por usuario y rol (*Estudiante*, *Docente*, *Prefectura* y *Administrador / Control Escolar*) para almacenamiento permanente. |
| `v1.0.0-beta.1` | Prueba con usuarios | Apertura controlada a un grupo piloto de estudiantes, docentes y prefectos del turno nocturno para validar rendimiento y flujo diario. |
| `v1.0.0-rc.1` | Casi listo | Corrección de incidencias detectadas durante la prueba piloto y congelamiento de funciones previas al despliegue. |
| `v1.0.0` | Producción (Estable) | Lanzamiento oficial del sistema AulaCheck para operación general en campus. |

---

## 3. Hallazgos Documentados Durante la Carga de Horarios (`v0.6.0`)

Durante la auditoría automática aplicada a los horarios reales del turno nocturno (`HORARIOS TURNO NOCTURNO.pdf`), se documentaron las siguientes observaciones operativas:

1. **Sin empalmes en la programación:** Los 39 grupos (771 bloques horarios) presentan **0 traslapos** de salón, docente o grupo.
2. **Salones `851`, `852` y `853`:** Aparecen asignados en grupos de LRI y LAE; se incorporaron provisionalmente en el Piso 6 del Edificio 800 para mantener visibilidad en el mapa interactivo (pendiente de confirmación física de piso).
3. **Grupo duplicado en documento fuente:** El horario de `IIL 8-N` figuraba repetido dos veces de forma idéntica en el PDF; se consolidó en un único registro para evitar falsos conflictos.
4. **Número de docente compartido (`326`):** El identificador numérico `326.` aparece compartido entre dos docentes distintos en el archivo fuente, por lo que el verificador valida conflictos mediante nombre completo.
5. **Materias pendientes de asignación (`Propuesta`):** Dos asignaturas de `IM 7-N` e `IM 8-N` aparecen con docente `"Propuesta"`; se muestran activas en su salón sin generar falsos traslapos de profesor.

---

## 4. Ficha Técnica Resumida (Para apartado técnico de documentación)

* **Tipo de aplicación:** Aplicación web SPA (*Single Page Application*) responsiva (computadora y teléfono).
* **Tecnologías base:** React, TypeScript, Tailwind CSS y Vite.
* **Procesamiento de hojas de cálculo:** Librería SheetJS (`xlsx`) para generación de plantillas `.xlsx`, lectura local y validación previa de datos antes de su carga.
* **Control de versiones:** Repositorio Git inicializado en la rama principal `main` (etiquetada en `v0.7.0`) y rama paralela `pruebas` destinada a pruebas e integración de base de datos.
