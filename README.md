# 🔥 Rescoldo

**Rescoldo** es un visor de chats de WhatsApp — te permite volver a ver conversaciones en el formato visual en el que naturalmente existieron, como chat, no como archivo de texto plano.

Funciona 100% en tu navegador, sin cuenta, sin login, sin que tus datos salgan de tu dispositivo.

---

## Disclaimer de marca

Rescoldo es un proyecto independiente, no afiliado ni respaldado por WhatsApp LLC ni Meta Platforms, Inc. El nombre "WhatsApp" y el diseño visual asociado son marcas registradas de sus respectivos dueños. Rescoldo está inspirado en ese lenguaje visual para un caso de uso personal de archivo, y no reproduce ningún logo ni asset oficial de WhatsApp.

---

## Cómo correrlo localmente

### Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Cloná el repositorio
git clone https://github.com/TU_USUARIO/rescoldo.git
cd rescoldo

# 2. Instalá las dependencias
npm install

# 3. Levantá el servidor de desarrollo
npm run dev
```

Abrí `http://localhost:5173/rescoldo/` en tu navegador.

### Otros comandos

```bash
npm run build    # Genera el bundle de producción en /dist
npm run preview  # Previsualiza el build de producción localmente
npm test         # Corre las pruebas unitarias con Vitest
```

---

## Arquitectura

- **Framework:** React + Vite
- **Almacenamiento:** File System Access API (escritorio) / IndexedDB + OPFS (celular)
- **Importación:** fflate (descompresión en streaming), whatsapp-chat-parser (base del parser)
- **PWA:** vite-plugin-pwa (instalable, funciona offline)
- **Testing:** Vitest
- **Hosting:** GitHub Pages

Toda la arquitectura está documentada en [`rescoldo-especificacion-tecnica.md`](./rescoldo-especificacion-tecnica.md).

---

## Licencia

MIT — libre para usar, modificar y distribuir.
