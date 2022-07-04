import { config } from "../config/config"

const fetchAllExercises = async () => {
    try{
        const result = await  fetch(`${config.apiUrl}/exercises`);
        if(result.ok){
            const exercises = await result.json();
            return exercises;
        }
    }catch(err){
        // error during fetch is handled here
        console.warn({err});
    }
}

export default fetchAllExercises;