/**
 * parser.test.js — Pruebas unitarias del parser de WhatsApp
 *
 * Estas pruebas cubren el módulo src/importer/parser.js.
 * Por ahora solo tiene un test de sanidad para confirmar que
 * Vitest está configurado correctamente. Las pruebas reales
 * se escriben en la Fase 4 junto con la implementación del parser.
 *
 * Principio rector: ningún mensaje debe perderse silenciosamente.
 * Los tests garantizan que el parser sea predecible y auditable.
 */

import { describe, it, expect } from 'vitest'

describe('Parser de WhatsApp (sanidad)', () => {
  it('el entorno de testing está funcionando', () => {
    expect(true).toBe(true)
  })

  it('el principio rector se puede expresar como test', () => {
    // Un parser que pierde mensajes silenciosamente viola el principio rector.
    // Este test es un placeholder — en Fase 4 habrá tests reales de casos edge:
    // mensajes multilínea, BOM UTF-8, marcas invisibles U+200E, GIFs como .mp4, etc.
    const principioRector = 'ningún mensaje ni archivo debe perderse silenciosamente'
    expect(principioRector).toBeTruthy()
  })
})
