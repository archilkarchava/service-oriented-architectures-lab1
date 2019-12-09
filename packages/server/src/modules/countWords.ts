export const countWords = (s: string) => {
    if (s.length === 0) return []
    const res = new Map<string, number>();
    for (const word of s.split(/ |\n|\,|\.|\!|\?|\;|\:/)) {
        if (word.length === 0) continue;
        res.set(word, res.get(word) ? res.get(word) + 1 : 1);
    }
    return Array.from(res).sort((a, b) => a[1] - b[1]);
}
