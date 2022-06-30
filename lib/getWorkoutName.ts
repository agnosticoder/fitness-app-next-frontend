// Generate workout name from the time of the day or night
export const getWorkoutName = () => {
    const date = new Date();
    if (date.getHours() >= 3 && date.getHours() < 6) {
        return 'Early Morning';
    }
    if (date.getHours() >= 6 && date.getHours() < 9) {
        return 'Morning';
    }
    if (date.getHours() >= 9 && date.getHours() < 12) {
        return 'Late Morning';
    }
    if (date.getHours() >= 12 && date.getHours() < 15) {
        return 'Early Afternoon';
    }
    if (date.getHours() >= 15 && date.getHours() < 18) {
        return 'Late Afternoon';
    }
    if (date.getHours() >= 18 && date.getHours() < 21) {
        return 'Evening';
    }
    if (date.getHours() >= 21 && date.getHours() < 24) {
        return 'Night';
    }
    return 'Late Night';
};
