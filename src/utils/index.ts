export const shuffleArray = (array: any[]): any[] => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
};

export const getChancesColor = (chance: number): string => {
    if(chance <= 25) {
        return 'red'
    } else if(chance <= 65) {
        return 'yellow'
    } else {
        return 'green'
    }
};