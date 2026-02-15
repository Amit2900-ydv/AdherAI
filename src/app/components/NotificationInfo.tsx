import { Info } from 'lucide-react';

export function NotificationInfo() {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window;
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  const isFigmaPreview = typeof window !== 'undefined' && window.location.hostname.includes('figma');

  return (
    <div className="fixed bottom-32 left-4 right-4 z-30 pointer-events-none">
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-lg pointer-events-auto">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm mb-1" style={{ fontWeight: 600 }}>
              Notification Status
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              {!isSupported && (
                <p>❌ Browser notifications not supported</p>
              )}
              {isSupported && (
                <>
                  <p>✅ In-app notifications: Working</p>
                  {(isInIframe || isFigmaPreview) ? (
                    <p>⚠️ Background notifications: Available in production only</p>
                  ) : (
                    <p>✅ Background notifications: Available</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
