const getWorkout = async <T>(id: string) => {
    const result = await fetch(`http://localhost:8000/workout/${id}`);
    if (result.ok) {
        const { data } = (await result.json()) as { data: T; code: number };
        return data;
    }
};

export default getWorkout;
