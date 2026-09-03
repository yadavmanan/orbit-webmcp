/// <reference types="vite/client" />
import type { AriaAttributes, DOMAttributes } from 'react';

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolaction?: string;
  }
}