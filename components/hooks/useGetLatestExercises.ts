import { useRouter } from "next/router";
import { useErrorHandler } from "react-error-boundary";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useErrorMessage from "./useErrorMessage";
import { customFetch } from "./useFetch";

type Payload = {
    names: string[];
}

const useGetLatestExercises = ({names}: Payload) => {
    const handleError = useErrorHandler();
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery(['latestexercises', names], async () => {
        const {data, error} = await customFetch(`http://satinder.local:8000/exercises/${names.join(',')}`);
        if(error) {
            handleErrorMessage(error);
            return;
        }
        return data;
    },
        {
            //Todo: add error handler
            onError: (err) => console.error(err),
            enabled: !!names.length,
        }
    );
};

export default useGetLatestExercises;