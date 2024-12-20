export default function ActivityLoader() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="relative w-20 h-20">
                {/* Central Circle */}
                <div className="w-16 h-16 bg-blue-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Orbiting Circle Container */}
                <div className="w-full h-full animate-orbit">
                    <div className="w-6 h-6 bg-green-500 rounded-full absolute top-1/2 left-3 -translate-x-1/2 -translate-y-full"></div>
                </div>
            </div>
        </div>
    )
}
