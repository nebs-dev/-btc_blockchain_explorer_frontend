const Loader = () => {
  return (
    <div className="text-center">
      <div className="mt-4">
        <svg
          className="w-5 h-5 mx-auto text-blue-500 animate-spin"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm9-9.583A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4zm2 14.292l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Loader
