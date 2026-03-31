import { expect } from '@playwright/test';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Extend Playwright's expect with React-specific matchers
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
    }
  }
}

expect.extend({
  toBeInTheDocument(received) {
    if (received === null || received === undefined) {
      return {
        message: () => 'Expected element to be in the document',
        pass: false,
      };
    }
    return {
      message: () => 'Expected element not to be in the document',
      pass: true,
    };
  },
  toHaveTextContent(received, text) {
    if (typeof received?.textContent !== 'string') {
      return {
        message: () => 'Expected element to have text content',
        pass: false,
      };
    }
    const pass = received.textContent.includes(text);
    return {
      message: () => pass
        ? 'Expected element not to have text content'
        : `Expected element to have text content: ${text}`,
      pass,
    };
  },
  toBeVisible(received) {
    if (!(received instanceof HTMLElement)) {
      return {
        message: () => 'Expected element to be visible',
        pass: false,
      };
    }
    const style = window.getComputedStyle(received);
    const pass = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    return {
      message: () => pass ? 'Expected element not to be visible' : 'Expected element to be visible',
      pass,
    };
  },
});