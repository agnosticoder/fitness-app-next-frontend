const fetchAllExercises = async () => {
    try{
        const result = await  fetch('http://localhost:8000/exercises');
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