#!/usr/bin/env node

import { Window } from "happy-dom"

import { patchRandom } from "../src/random.js"

// 1️⃣ Install DOM *before anything else*
const window = new Window()

globalThis.window = window
globalThis.document = window.document
globalThis.HTMLElement = window.HTMLElement
globalThis.Node = window.Node
globalThis.Comment = window.Comment

// Optional but sometimes needed
globalThis.customElements = window.customElements

const restore = patchRandom(42)
await import("@inglorious/web")
restore()

// 2️⃣ Dynamically import the real CLI
await import("../src/cli.js")
