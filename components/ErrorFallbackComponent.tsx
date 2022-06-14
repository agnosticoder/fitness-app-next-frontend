const ErrorFallbackComponent = ({ error, componentStack, resetErrorBoundary }: any) => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-slate-400 gap-2'>
            <h1 className='text-xl font-bold'>Something went wrong, we are working on it. Please try again after sometime</h1>

            {/* //Todo: Remove below code after testing */}
            <p className='bg-yellow-300 p-1 rounded italic font-light text-sm'>Error: {error.message}</p>
            <p>{componentStack}</p>
            <button className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"' onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default ErrorFallbackComponent;