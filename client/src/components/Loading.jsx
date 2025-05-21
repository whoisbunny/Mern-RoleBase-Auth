
const Loading = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
            <svg
                className="animate-spin h-16 w-16 text-blue-500 mb-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <p className="text-gray-200 text-lg font-semibold">Loading...</p>
        </div>
    </div>
);

export default Loading;