import test from 'node:test';
import assert from 'node:assert/strict';
import { createNavigationController } from '../script.js';

function makeElement() {
  return {
    attributes: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = String(value); },
    getAttribute(name) { return this.attributes[name] ?? null; },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    contains() { return false; },
  };
}

test('abre e fecha o menu mobile atualizando aria-expanded', () => {
  const menu = makeElement();
  const button = makeElement();
  const controller = createNavigationController({ menu, button, documentRef: { addEventListener() {} } });

  controller.toggle();
  assert.equal(menu.getAttribute('data-open'), 'true');
  assert.equal(button.getAttribute('aria-expanded'), 'true');

  controller.close();
  assert.equal(menu.getAttribute('data-open'), 'false');
  assert.equal(button.getAttribute('aria-expanded'), 'false');
});