export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getWeightedIndex(weights: number[]): number {
    // If all weights are 0, return random index
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight === 0) {
        return Math.floor(Math.random() * weights.length);
    }

    // Weighted random selection
    const random = Math.random() * totalWeight;
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (random < sum) {
            return i;
        }
    }

    return weights.length - 1;
}

