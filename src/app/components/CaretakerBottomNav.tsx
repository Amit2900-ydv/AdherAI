import { Home, Users, FileText, Settings } from 'lucide-react';

interface CaretakerBottomNavProps {
    activeScreen: 'dashboard' | 'patients' | 'reports' | 'settings';
    onNavigate: (screen: 'dashboard' | 'patients' | 'reports' | 'settings') => void;
}

export function CaretakerBottomNav({ activeScreen, onNavigate }: CaretakerBottomNavProps) {
    const navItems = [
        { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
        { id: 'patients' as const, label: 'Patients', icon: Users },
        { id: 'reports' as const, label: 'Reports', icon: FileText },
        { id: 'settings' as const, label: 'Settings', icon: Settings }
    ];

    return (
        <div className="bg-white border-t border-gray-200 safe-area-pb">
            <div className="grid grid-cols-4 h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeScreen === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                            <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
