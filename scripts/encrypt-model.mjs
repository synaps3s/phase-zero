#!/usr/bin/env node
/*
 * Seals a licensed 3D model so it can sit in a public repository.
 *
 * Some models shown on the site are licensed to this project but not to
 * everybody who clones it. Their licences allow them to be shown inside a
 * work and forbid handing the file out in the form it was downloaded. A
 * public repository hands out every file in it, so a model of that kind is
 * committed sealed: compressed, then encrypted with AES-256-GCM, with the
 * key kept out of the repository as a deploy secret.
 *
 * The published site is given the key at build time and opens the model in
 * the reader's browser. A clone or a fork without the key gets a file that is
 * noise, and the page it belongs to renders without the model, which is a
 * working state and not a broken one.
 *
 * Usage:
 *   PHASE_ZERO_MODEL_KEY=<key> node scripts/encrypt-model.mjs <in.glb> <out.bin>
 *
 * Without PHASE_ZERO_MODEL_KEY a new key is generated and printed once. Put it
 * in .env for local builds and in the production environment's secrets for
 * the deploy. It is never written anywhere by this script.
 *
 * The sealed file is: four bytes of magic ("PZM1"), a twelve byte nonce, then
 * the gzip of the model encrypted with the tag appended, which is the layout
 * the browser's own AES-GCM expects.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createCipheriv, randomBytes } from 'node:crypto';
import { gzipSync, constants } from 'node:zlib';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/encrypt-model.mjs <in.glb> <out.bin>');
  process.exit(1);
}

let key;
const given = process.env.PHASE_ZERO_MODEL_KEY;
if (given) {
  key = Buffer.from(given, 'base64url');
  if (key.length !== 32) {
    console.error('PHASE_ZERO_MODEL_KEY must be 32 bytes, written as base64url.');
    process.exit(1);
  }
} else {
  key = randomBytes(32);
  console.log('No key given, so a new one was made. Keep it as PHASE_ZERO_MODEL_KEY:');
  console.log(key.toString('base64url'));
}

const model = readFileSync(input);
const packed = gzipSync(model, { level: constants.Z_BEST_COMPRESSION });
const nonce = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, nonce);
const sealed = Buffer.concat([cipher.update(packed), cipher.final(), cipher.getAuthTag()]);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, Buffer.concat([Buffer.from('PZM1'), nonce, sealed]));
console.log(`Sealed ${input} (${model.length} bytes) into ${output} (${sealed.length + 16} bytes).`);
