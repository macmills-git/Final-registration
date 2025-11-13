import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    TrendingUp, PieChart, BarChart3, Activity, Moon, Sun, LogOut, X
} from 'lucide-react';
import compssaLogo from '../assets/images/compssalogo.png';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export const Sidebar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { signOut } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleSignOutClick = () => setShowLogoutModal(true);
    const handleConfirmSignOut = () => {
        setShowLogoutModal(false);
        signOut();
    };
    const handleCancelSignOut = () => setShowLogoutModal(false);

    const analyticsItems = [
        { path: '/dashboard#operations', label: 'Daily Operations', icon: TrendingUp },
        { path: '/dashboard#courses', label: 'Course Analytics', icon: PieChart },
        { path: '/dashboard#performance', label: 'Staff Performance', icon: BarChart3 },
        { path: '/dashboard#system', label: 'System Status', icon: Activity },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border-r border-white/20 dark:border-gray-700/20 shadow-[4px_0_30px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out z-40 w-[15%] lg:w-[11%]">
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-center p-4 border-b border-white/20 dark:border-gray-700/20">
                    <Link to="/home">
                        <img src={compssaLogo} alt="COMPSSA Logo" className="h-12 w-auto" />
                    </Link>
                </div>

                {/* Analytics Section */}
                <nav className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-2">
                        {analyticsItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.path}>
                                    <a
                                        href={item.path}
                                        className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all duration-200 group text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-xs font-bold text-center leading-tight">{item.label}</span>
                                    </a>
                                    {index < analyticsItems.length - 1 && (
                                        <div className="border-t border-gray-300 dark:border-gray-600 mt-2"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </nav>


            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Confirm Sign Out</h2>
                            <button
                                onClick={handleCancelSignOut}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                    <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                                        Are you sure you want to sign out?
                                    </h3>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancelSignOut}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmSignOut}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};
