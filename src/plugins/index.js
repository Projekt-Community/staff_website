/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
/// <reference path=""

import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { createPinia } from 'pinia'
import VueCroppie from 'vue-croppie'

// Types
const pinia = createPinia()

export function registerPlugins(app) {
  loadFonts()
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
    .use(VueCroppie)

}

export default { pinia }