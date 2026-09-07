# 🔥 Rescoldo — Especificación Técnica y Prompt de Desarrollo

> Documento de trabajo para pasar a Antigravity (u otra herramienta de desarrollo asistido). Reúne todas las decisiones de arquitectura y diseño tomadas antes de escribir una sola línea de código.

**Cómo leer este documento:** cada decisión importante está explicada en tres partes — **Qué** (la decisión en sí), **Cómo** (la forma concreta de implementarla) y **Por qué** (la razón, para que si algo no se puede cumplir tal cual, quien programe entienda qué problema se estaba resolviendo y pueda proponer una alternativa que resuelva lo mismo). Los valores marcados **[verificar]** son referencias que pueden necesitar ajuste al compararlas contra la aplicación real; los marcados **[fijo]** son decisiones conscientes que no deberían cambiar sin conversarlo antes.

## Índice

0. Instrucciones para quien desarrolle esto
1. Visión y contexto
2. Alcance de la versión 1
3. Arquitectura general
4. Modelo de datos
5. Sistema de diseño
6. Autenticación y sincronización
7. Motor de importación
8. Menú de Ajustes
9. Consideraciones legales y de marca
10. Decisiones técnicas aún abiertas
11. Plan de fases de desarrollo
12. Registro de decisiones

---

## 0. Instrucciones para quien desarrolle esto (Antigravity)

Esto no es un encargo de "generá la app completa de una". Quien lea este documento debe seguir estas reglas de trabajo:

1. **Trabajar fase por fase**, siguiendo el orden de la sección 11. No adelantar fases ni mezclarlas.
2. **Explicar el razonamiento en cada paso**, en lenguaje simple: qué se construyó, qué alternativas había, y por qué se eligió ese camino. Quien encargó este proyecto lo está usando como su primera experiencia real de desarrollo de software y quiere entender el proceso, no solo recibir el resultado final.
3. **Pausar al final de cada fase** y esperar confirmación antes de seguir con la próxima, salvo que se indique explícitamente lo contrario.
4. **Avisar, no improvisar en silencio**, si alguna especificación de este documento resulta impráctica al implementarla. Explicar el problema encontrado y proponer una alternativa concreta, en vez de cambiar el comportamiento sin decirlo.
5. **Hacer commits pequeños y descriptivos**, uno por unidad lógica de trabajo, para que se pueda seguir la historia del proyecto como parte del aprendizaje.
6. **Principio rector del proyecto, por encima de cualquier otra prioridad de código:** ningún mensaje ni archivo multimedia debe perderse ni corromperse silenciosamente. Ante cualquier ambigüedad no cubierta en este documento, priorizar la preservación de datos sobre la elegancia o brevedad del código.

---

## 1. Visión y contexto

Rescoldo nace de una necesidad personal: poder volver a ver conversaciones de WhatsApp con un familiar que falleció, en el formato visual en el que naturalmente existieron — como chat, no como archivo de texto plano. A partir de esa necesidad puntual, el proyecto también se plantea como pieza de portafolio profesional, por lo que se publicará como código abierto en GitHub.

Esta doble naturaleza (herramienta personal + pieza de portafolio) determina casi todas las decisiones de este documento: privacidad y preservación de datos por un lado, código prolijo y bien documentado por el otro.

---

## 2. Alcance de la versión 1

### Entra en v1
- Importar exportaciones de WhatsApp (`.zip` o carpeta descomprimida) con texto, fotos, video, gifs, stickers y audios.
- Visualización tipo chat, fiel al diseño actual de WhatsApp, en escritorio y celular.
- Modo claro y modo oscuro.
- Funcionamiento 100% local — sin cuenta, sin login obligatorio, sin backend propio.
- Panel de "conectar respaldo en la nube" visible pero deshabilitado (preparado para v2).
- Bloqueo opcional con PIN o biometría (apagado por defecto).

### Explícitamente fuera de v1 (decisión tomada, no descuidada)
- Sincronización real en la nube — queda diseñada, no implementada.
- Login social real (Google/Microsoft/Apple) — la interfaz lo insinúa pero no funciona todavía.
- Modo incógnito / anonimización de nombres — uso personal, sin necesidad inmediata; se documenta para el futuro y **no aparece ni siquiera como opción deshabilitada** en esta versión.
- Multiusuario o despliegue público en vivo.

---

## 3. Arquitectura general

### 3.1 Modelo local-first con nube opcional

**Qué:** la aplicación funciona enteramente en el navegador del usuario, sin backend propio. Quien quiera respaldo en la nube conecta su propia cuenta de Supabase ("trae tu propia nube").

**Cómo:** todo el procesamiento (parseo, almacenamiento, render) ocurre del lado del cliente. La única infraestructura que existe es el propio código estático publicado (GitHub Pages, Vercel, o similar) — no hay servidor propio que reciba ni guarde datos de nadie.

**Por qué:** resuelve la contradicción original entre "quiero que sea local" y "quiero login" — separa el caso de uso principal (ver los chats, ya, sin fricción) del secundario (respaldo, a futuro). Evita además que este proyecto personal termine siendo responsable de datos sensibles de terceros.

### 3.2 Plataforma: PWA responsive

**Qué [fijo]:** una única aplicación web progresiva (PWA), instalable, que se adapta a escritorio y celular con el mismo código.

**Cómo:** breakpoint de diseño en ~900px de ancho.
- **Escritorio (≥900px):** dos paneles fijos, como WhatsApp Web/Desktop — barra lateral con lista de chats a la izquierda, conversación abierta a la derecha, ambos visibles a la vez.
- **Celular (<900px):** una sola columna. La lista de chats es la pantalla inicial; al tocar un chat, la conversación se desliza por encima con botón de "volver" — igual al comportamiento real de WhatsApp mobile.

**Por qué:** WhatsApp Web/Desktop y WhatsApp mobile son layouts distintos, no el mismo diseño escalado. Como el escritorio es la prioridad, hay que diseñar ese layout de dos paneles desde el inicio, en vez de forzar el patrón mobile (barra inferior, pantallas apiladas) a una pantalla grande.

### 3.3 Capa de almacenamiento con adaptadores duales

**Qué [fijo]:** dos formas de guardar datos localmente, elegidas automáticamente según la plataforma, detrás de una interfaz común.

**Cómo:**
- **Adaptador de escritorio (File System Access API):** el usuario apunta a una carpeta local (la del export ya descomprimido); la app lee/escribe ahí directo, sin duplicar archivos pesados.
- **Adaptador de celular (IndexedDB / OPFS):** Safari/iOS no soporta bien la File System Access API, así que los archivos se copian dentro del almacenamiento del navegador al importar.
- El resto de la aplicación llama siempre a la misma interfaz abstracta (`get(media_ref)`, `save(media_ref, data)`) sin saber cuál adaptador está activo por debajo.

**Por qué:** maximiza eficiencia en el caso de uso real (compu de escritorio, años de fotos y video) sin bloquear el soporte mobile. Definir la interfaz común desde el día uno evita reescribir la lógica de la UI cuando más adelante se sume un tercer adaptador (nube).

### 3.4 Diagrama de flujo general

```
[ IMPORTACIÓN ]                    [ ALMACENAMIENTO LOCAL ]              [ VISUALIZACIÓN ]
1. Usuario selecciona .zip          3. Adaptador según plataforma:        5. Lista de chats
   o carpeta descomprimida             - Filesystem (escritorio)            (split-view o
2. Web Worker: descomprime,            - IndexedDB/OPFS (celular)            columna única)
   parsea, clasifica mensajes       4. JSON del chat + referencias        6. Vista de conversación
                                        de media guardados                    con media renderizada

                                    [ NUBE — OPCIONAL, DESHABILITADO EN v1 ]
                                    Si el usuario conecta su propio Supabase:
                                    sync del JSON (liviano) + media opt-in (pesado)
```

---

## 4. Modelo de datos

### 4.1 Por qué cambia respecto al documento original

El esquema original asumía un backend multiusuario (`user_id`, `media_url` apuntando a un bucket en la nube) y un chat siempre de dos personas (`sender` + `is_me`). Cuatro problemas concretos obligan a ajustarlo:

1. **WhatsApp no exporta fotos de perfil de los contactos.** Hay que poder asignarlas a mano.
2. **WhatsApp no da un ID único por mensaje.** Hay que generarlo, de forma que reimportar el mismo archivo no duplique todo.
3. **`media_url` asume que siempre hay una URL de nube.** Con almacenamiento híbrido, la referencia debe ser agnóstica al adaptador.
4. **Los chats grupales tienen más de un remitente**, que necesitan color y avatar propio, como en WhatsApp real.

### 4.2 Esquema actualizado

```json
{
  "chat_id": "wa_<hash>",
  "profile_id": "local_default",
  "metadata": {
    "title": "Chat con Papá",
    "chat_type": "individual",
    "imported_at": "2026-09-06T10:00:00",
    "total_messages": 1250,
    "participants": [
      { "participant_id": "p_me", "display_name": "Vos", "is_me": true, "avatar_ref": null, "color": null },
      { "participant_id": "p_001", "display_name": "Papá", "is_me": false, "avatar_ref": null, "color": "#F4A259" }
    ]
  },
  "messages": [
    {
      "message_id": "sha256(timestamp+sender+texto)",
      "timestamp_raw": "05/09/26, 14:00:32",
      "timestamp_iso": "2026-09-05T14:00:32",
      "participant_id": "p_001",
      "type": "text",
      "text": "...",
      "media_ref": null,
      "reply_to": null,
      "forwarded": false,
      "edited": false,
      "system_event_type": null
    },
    {
      "message_id": "sha256(...)",
      "timestamp_raw": "05/09/26, 14:02:10",
      "timestamp_iso": "2026-09-05T14:02:10",
      "participant_id": "p_001",
      "type": "image",
      "text": null,
      "media_ref": { "adapter": "filesystem", "ref": "IMG-20260905-WA0001.jpg" },
      "reply_to": null,
      "forwarded": false,
      "edited": false,
      "system_event_type": null
    },
    {
      "message_id": "sha256(...)",
      "timestamp_raw": "05/09/26, 14:05:00",
      "timestamp_iso": "2026-09-05T14:05:00",
      "participant_id": null,
      "type": "system_event",
      "text": "Cambiaste el ícono de este grupo",
      "media_ref": null,
      "system_event_type": "group_icon_changed"
    }
  ]
}
```

### 4.3 Campo por campo — qué es y por qué existe

| Campo | Qué es | Por qué existe |
|---|---|---|
| `chat_id` | Hash derivado del título + primer/último timestamp | Detecta si un chat ya fue importado antes, sin depender de un ID que WhatsApp no provee |
| `profile_id` | Referencia al perfil local activo, no a una cuenta en la nube | Reemplaza `user_id`; sigue funcionando sin backend |
| `participants[]` | Lista de remitentes con color y avatar propio | Necesario para grupos; resuelve que WhatsApp no exporta fotos de perfil (se asignan a mano) |
| `message_id` | Hash de timestamp + remitente + texto | WhatsApp no da IDs únicos; sin esto, reimportar el mismo archivo duplicaría todo el chat |
| `timestamp_raw` / `timestamp_iso` | Hora tal cual el export, y su versión parseada | El export no trae zona horaria — se decidió no convertir nada y mostrar la hora tal cual fue |
| `type` | `text` \| `image` \| `video` \| `gif` \| `sticker` \| `audio` \| `document` \| `location` \| `contact_card` \| `system_event` \| `deleted` \| `unsupported` | Cubre todos los tipos de contenido reales de un export de WhatsApp, incluyendo casos que se pasaron por alto al principio (audio, ubicación, tarjetas de contacto) |
| `media_ref` | Objeto `{ adapter, ref }` en vez de una URL fija | Agnóstico a si el archivo vive en el filesystem local, en IndexedDB, o (a futuro) en la nube |
| `reply_to` / `forwarded` / `edited` | Metadatos que WhatsApp incluye como texto plano, no como campos | Sin extraerlos se pierde información real de la conversación (qué se respondía, qué se reenvió) |
| `system_event_type` | Tipo de evento cuando `type = system_event` | Estos mensajes no son parte de la conversación real y se renderizan distinto (texto centrado, sin burbuja) |

**[verificar]** Los "GIFs" de WhatsApp casi siempre son archivos `.mp4` en loop, no `.gif` reales — `type: "gif"` debe mapear a un archivo de video en la práctica; confirmar contra ejemplos reales del export antes de cerrar el parser.

---

## 5. Sistema de diseño

### 5.1 Navegación — decisión sobre las pestañas

**Qué [fijo]:** se reemplazan las 4 pestañas originales de WhatsApp (Chats / Novedades / Comunidades / Llamadas) por **Chats / Personas / Multimedia / Ajustes**.

**Por qué:** "Novedades", "Comunidades" y "Llamadas" asumen mensajería en vivo, algo que Rescoldo no hace — es un visor de archivo. "Personas" (listado de remitentes) y "Multimedia" (galería global de fotos/video de todos los chats juntos) sí son útiles acá, y mantienen la misma cantidad de espacios en la barra.

### 5.2 Layout

Ver sección 3.2 — panel doble en escritorio (≥900px), columna única en celular (<900px).

### 5.3 Paleta de color

**[verificar]** WhatsApp ajusta tonos con A/B tests seguido. Estos son los valores más consistentes encontrados en fuentes actuales, pero hay que confirmarlos con un selector de color contra la app real antes de fijarlos en código de producción.

| Token | Modo claro | Modo oscuro |
|---|---|---|
| Acento de marca (verde) | `#25D366` | `#25D366` |
| Fondo general / header | `#FFFFFF` | `#111B21` |
| Fondo del área de chat | `#ECE5DD` (con patrón doodle) | `#0B141A` |
| Burbuja propia (`is_me: true`) | `#D9FDD3` | `#005C4B` |
| Burbuja del otro | `#FFFFFF` | `#202C33` |
| Texto principal | `#111111` (no negro puro) | blanco roto (no `#FFFFFF` puro) |
| Enlaces | verde (no azul) | verde |

**Color de marca de Rescoldo — distinto del verde funcional [fijo]:** el logo (una flama/brasa) usa su propio color, un naranja/ámbar cálido (ej. `#F4A259`), independiente de la paleta funcional de la UI. Le da identidad propia a Rescoldo en vez de leerse como "WhatsApp con otro ícono".

### 5.4 Tipografía

**Qué [fijo]:** fuente del sistema operativo, no una fuente propia empaquetada.

**Cómo:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

**Por qué:** San Francisco (la fuente de iOS/macOS) es propietaria de Apple y no se puede distribuir como webfont para usuarios de Windows/Android. Usar el stack de fuentes del sistema da, además, fidelidad real "por plataforma" gratis: cada quien ve la tipografía nativa de su propio sistema, igual que la app real.

### 5.5 Librería de íconos

**Qué [fijo]:** Lucide (liviana, de código abierto, sin costo de licencia).

### 5.6 Componentes necesarios

- Barra lateral / barra de pestañas inferior (según plataforma)
- Ítem de lista de chat (avatar, nombre, preview del último mensaje con ícono según tipo, hora, indicador de "no visto desde que se importó")
- Burbuja de mensaje (variantes: texto, imagen, video, gif, sticker, audio con reproductor, documento, ubicación, tarjeta de contacto, evento de sistema)
- Visor de media a pantalla completa (foto/video, con navegación entre elementos del mismo chat)
- Barra de búsqueda con filtros (Todos / Con multimedia / Grupos / Individual)
- Modal/hoja del botón "+" (ver sección 7.4)
- Pantallas de Ajustes (ver sección 8)
- Panel "Conectar respaldo en la nube" (deshabilitado, ver sección 6)

### 5.7 Estados vacío, de carga y de error

No estaban contemplados en el planteo original, y son literalmente la primera pantalla que se ve en la vida real de este proyecto:

- **Vacío** (0 chats importados): invita a usar el botón "+", en vez de mostrar una lista en blanco sin contexto.
- **Carga** (procesando un `.zip` pesado): barra de progreso real, no un spinner genérico — un chat de años puede tardar, y sin feedback parece colgado.
- **Error** (zip corrupto, formato no reconocido): mensaje concreto sobre qué pasó y qué hacer, nunca un error técnico crudo.

**Nota de tono:** para estos tres estados y para los textos del logo/pantalla de bienvenida (los únicos lugares donde Rescoldo tiene identidad propia por fuera del calco de WhatsApp), escribir con voz propia — directa, cálida, sin genérico corporativo — evitando las fórmulas por defecto que cualquier herramienta de IA tiende a repetir (eyebrows en mayúscula, tarjetas redondeadas idénticas con sombra gris, flechas "→" en botones, fondo crema con acento terracota). El resto de la interfaz sí debe seguir fielmente el lenguaje visual de WhatsApp.

---

## 6. Autenticación y sincronización

### 6.1 Qué existe en v1

**Qué [fijo]:** no hay login funcional. El avatar (donde iría la foto de perfil) abre un panel de **"Conectar respaldo en la nube"**, visible pero deshabilitado — un texto tipo "Próximamente: conectá tu propia cuenta de Supabase para tener respaldo en la nube", sin flujo de OAuth real todavía.

**Por qué:** ver los chats nunca debe depender de crear una cuenta — sería contradictorio con el propósito del proyecto. Diseñar la interfaz ahora, sin la lógica detrás, deja el terreno preparado para v2 sin bloquear el uso real hoy.

### 6.2 Bloqueo con PIN o biometría (opcional, apagado por defecto)

**Qué [fijo]:** un interruptor en Ajustes → Privacidad, apagado por defecto. Si se activa, pide PIN o biometría (WebAuthn) al abrir la app.

**Por qué:** dado lo sensible del contenido vale la pena ofrecerlo, pero al ser un dispositivo personal no debe ser obligatorio ni fricción por defecto.

### 6.3 Diseño de la sincronización futura (documentado, no implementado en v1)

**Qué:** modelo "trae tu propia nube" — cada quien clona el repo y conecta su propio proyecto de Supabase, no un backend centralizado de Rescoldo.

**Cómo (para cuando se implemente):**
- Se sincroniza el JSON del chat (liviano) por defecto si el usuario activa la nube.
- La media (fotos/video, pesada) requiere un opt-in explícito y separado, con advertencia de espacio.
- Cifrado del lado del cliente antes de subir cualquier dato, para que ni el propio proveedor de Supabase pueda leer el contenido en texto plano.
- La sección de nube en Ajustes detecta automáticamente si hay credenciales de Supabase configuradas (variables de entorno tipo `SUPABASE_URL` / `SUPABASE_ANON_KEY`, análogas a las del documento original); si no las hay, se oculta o deshabilita sola, sin errores.

**Por qué [contexto importante para quien lo implemente]:** el plan gratuito de Supabase da 500MB de base de datos y **1GB de storage de archivos** — insuficiente para años de fotos/video si se sincroniza todo sin criterio, de ahí la separación JSON-vs-media. Además, los proyectos gratuitos de Supabase se pausan solos tras una semana de inactividad, lo cual encaja mal con un uso esporádico ("de vez en cuando reviso estos chats") — hay que detectar ese estado y avisar, no fallar en silencio. El login social real (Google/Microsoft/Apple) requerirá que cada quien configure sus propias credenciales OAuth en su propio proyecto — no se pueden compartir esas claves en un repositorio público.

---

## 7. Motor de importación

### 7.1 Librería de descompresión

**Qué [fijo]:** usar **fflate** o **zip.js** en lugar de JSZip.

**Por qué:** JSZip carga el archivo `.zip` completo en memoria antes de poder leer nada — con años de fotos y video (fácilmente varios GB) esto puede colgar el navegador. fflate y zip.js soportan lectura en streaming, entrada por entrada, sin necesitar el paquete completo en memoria (fflate soporta archivos de hasta 4GB).

### 7.2 Parser de texto

**Qué [fijo]:** `whatsapp-chat-parser` como base, más una capa de clasificación propia encima.

**Por qué:** la librería solo devuelve fecha/autor/texto/adjunto — no distingue mensajes de sistema, eliminados, editados o reenviados. Esa clasificación hay que construirla a mano, comparando el texto contra un diccionario de patrones configurable por idioma (los mensajes de sistema de WhatsApp vienen en el idioma del teléfono que exportó, no en el idioma de la app).

### 7.3 Pipeline completo

1. **Selección de origen** — `.zip`, o en escritorio, carpeta ya descomprimida (vía File System Access API).
2. **Transferencia a un Web Worker** como stream, para no bloquear la interfaz.
3. **Descompresión progresiva** con fflate/zip.js.
4. **Localización flexible del archivo de texto** — buscar cualquier `.txt` en la raíz del paquete; el nombre varía según idioma (`_chat.txt`, `WhatsApp Chat with X.txt`, etc.).
5. **Limpieza del texto** — remover BOM UTF-8 y marcas invisibles U+200E antes de aplicar cualquier expresión regular de fecha (si no se limpian, el parsing de las primeras líneas falla).
6. **Parsing línea por línea** — unir mensajes multilínea al mensaje anterior; clasificar contra el diccionario de patrones de sistema/eliminado/editado/reenviado.
7. **Vinculación de media** — por cada adjunto mencionado, buscar el archivo real dentro del paquete; si no está (export "sin multimedia"), marcar `media_missing` en vez de fallar; escribir el archivo vía el adaptador de almacenamiento activo.
8. **Progreso con throttling** — reportar avance cada 1% o cada 50 mensajes, no mensaje por mensaje, para no saturar la interfaz.
9. **Deduplicación** — si el `chat_id` generado ya existe, preguntar si se fusiona, se reemplaza, o se importa como copia nueva.
10. **Resumen final** — mostrar algo como "1.250 mensajes importados · 340 fotos · 12 videos · 3 con media faltante", para dar certeza de que nada se perdió en el camino.

**Manejo de fallas parciales [fijo]:** si un archivo de media puntual dentro del paquete está corrupto, ese mensaje se marca con un error de media y la importación del resto del chat continúa — nunca debe perderse un chat completo por un solo archivo roto.

**Cancelación [fijo]:** el usuario debe poder cancelar una importación en curso (por ejemplo, si eligió el archivo equivocado) sin dejar memoria o estado a medio guardar.

### 7.4 Menú del botón "+"

**Qué [fijo]:** no se copia literal el menú de "crear grupo" de WhatsApp (Nuevo grupo / Difusión / Comunidad no tienen función acá). Se reemplaza por:
- Importar un chat
- Importar varios a la vez (respaldo completo)
- Vincular una carpeta local (en escritorio, vía File System Access API)

**Por qué:** Rescoldo es un visor/importador de archivo, no un mensajero — copiar opciones que asumen chat en vivo dejaría botones que nunca se pueden usar. Se mantiene la estética (hoja de pantalla completa, ítems con íconos grandes) pero con acciones reales.

---

## 8. Menú de Ajustes

| Sección | Contenido |
|---|---|
| Perfil | Nombre y foto (solo si hay perfil local configurado) |
| Apariencia | Claro / Oscuro / Automático (según sistema) |
| Chats importados | Gestionar, eliminar, reimportar |
| Almacenamiento y datos | Espacio usado, elegir dónde se guarda la media |
| Privacidad | Bloqueo con PIN/biometría (interruptor, apagado por defecto) |
| Sincronización en la nube | Panel deshabilitado / "próximamente" (ver sección 6) |
| Idioma | Selector de idioma de la interfaz |
| Acerca de | Versión, enlace al repositorio de GitHub, licencia |
| Datos | Exportar todos mis datos / Eliminar todos los datos |

---

## 9. Consideraciones legales y de marca

- **No usar el logo oficial de WhatsApp** como asset del proyecto.
- **Aclarar en el README** que Rescoldo es un proyecto independiente, no afiliado ni respaldado por WhatsApp/Meta, inspirado en su lenguaje visual para un caso de uso personal de archivo.
- **Licencia sugerida [verificar con el usuario]:** MIT, licencia permisiva estándar para proyectos de portafolio en GitHub — cambiar si se prefiere otra.
- Al ser código abierto sin backend propio (sección 3.1), gran parte del riesgo de manejar datos sensibles de terceros desaparece — cada quien procesa sus propios datos en su propio dispositivo.

---

## 10. Decisiones técnicas aún abiertas

Estas no se discutieron durante el proceso de arquitectura y quedan a criterio de quien implemente (Antigravity puede proponer y preguntar, no debe asumir en silencio):

- **Framework de frontend** (vanilla JS + Web Components, React, Vue, Svelte, etc.).
- **Herramienta de build** (Vite, esbuild, ninguna/sin build).
- **Estrategia de testing** — no se discutió si hay pruebas automatizadas, y de qué tipo.
- **Dónde se aloja la versión pública de código abierto** (GitHub Pages, Vercel, Netlify, o solo instrucciones de instalación local).

---

## 11. Plan de fases de desarrollo

| Fase | Objetivo | Entregable |
|---|---|---|
| 0 | Setup del proyecto | Repositorio inicializado, decisiones de la sección 10 resueltas y documentadas |
| 1 | Sistema de diseño | Tokens de color/tipografía como variables de código, componentes base sin datos reales todavía |
| 2 | Modelo de datos | Esquema de la sección 4 implementado, con datos de prueba |
| 3 | Capa de almacenamiento | Ambos adaptadores (filesystem + IndexedDB/OPFS) funcionando detrás de la interfaz común |
| 4 | Motor de importación | Pipeline completo de la sección 7, probado con un export real |
| 5 | UI — Chats y conversación | Lista de chats, vista de conversación, visor de media a pantalla completa |
| 6 | UI — Ajustes y estados | Pantallas de Ajustes, estados vacío/carga/error, panel de nube deshabilitado |
| 7 | Empaquetado | PWA instalable, funcionando en escritorio y celular |
| 8 | Publicación | README con disclaimer de marca, licencia, capturas de pantalla |

*(Fase futura, fuera de v1): implementación real del adaptador de nube (Supabase), login social, modo incógnito.*

---

## 12. Registro de decisiones

| Pregunta | Decisión |
|---|---|
| ¿Local o nube? | Híbrido: local-first, nube opcional vía "trae tu propia cuenta" |
| ¿Qué significa "publicar"? | Código abierto en GitHub, sin backend propio hosteado |
| ¿Plataforma prioritaria? | Escritorio primero, celular parejo desde el día 1 |
| ¿Modo incógnito en v1? | No — ni siquiera visible; se documenta para más adelante |
| ¿Bloqueo PIN/biometría en v1? | Sí, opcional, apagado por defecto |
| ¿Librería de íconos? | Lucide |
| ¿Nombre del proyecto? | Rescoldo — logo de flama en color propio (ámbar), distinto del verde funcional de la UI |

---

Fin del documento. Cualquier ambigüedad no cubierta acá debe resolverse a favor del principio rector de la sección 0: **no perder nunca un mensaje ni un archivo.**
