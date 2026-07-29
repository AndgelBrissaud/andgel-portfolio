let _handler: ((message: string, type?: 'info'|'success'|'error', duration?: number) => void) | null = null;

export function setToastHandler(fn: (message: string, type?: 'info'|'success'|'error', duration?: number) => void) {
  _handler = fn;
}

export function clearToastHandler() {
  _handler = null;
}

export function showToast(message: string, type: 'info'|'success'|'error' = 'info', duration = 4000) {
  if (_handler) {
    try {
      _handler(message, type, duration);
    } catch {
      // ignore
    }
  }
}
