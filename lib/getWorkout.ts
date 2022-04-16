const getWorkout = async (id: string) => {
    const result = await fetch(`http://localhost:8000/workout/${id}`)
    if(result.ok){
        const workout = result.json();
        return workout;
    }
}

export default getWorkout;