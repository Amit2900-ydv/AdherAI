// Service Worker Registration Utility

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // Check if running in supported environment
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Workers are not supported in this environment');
    return null;
  }

  // Skip registration in Figma preview or iframe environments
  if (window.location.hostname.includes('figma') || window.self !== window.top) {
    console.log('Service Worker registration skipped in preview environment');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });

    console.log('Service Worker registered successfully:', registration);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated') {
            console.log('Service Worker updated');
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.log('Service Worker registration skipped:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}