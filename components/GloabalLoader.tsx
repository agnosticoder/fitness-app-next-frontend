import { useIsFetching } from "react-query";


const GlobalLoader = () => {
    const isFetching = useIsFetching();

    return (
        <>
            <div className={`fixed top-4 right-4 z-10 transition-opacity duration-300 ease-in-out ${isFetching ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-gray-900 opacity-75 rounded-lg shadow-lg p-4">
                    <div className="text-center">
                        <div className="text-white">
                            <div className="text-2xl">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GlobalLoader;