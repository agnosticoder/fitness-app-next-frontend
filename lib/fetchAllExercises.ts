const fetchAllExercises = async () => {
    try{
        const result = await  fetch('http://localhost:8000/exercises');
        if(result.ok){
            const exercises = await result.json();
            console.log({exercises});
            return exercises;
        }
    }catch(err){
        console.warn({err});
    }
}

export default fetchAllExercises;