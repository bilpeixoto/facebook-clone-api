const reactionsType = ['like', 'love', 'haha', 'sad', 'angry'] as const
type ReactionsType = typeof reactionsType[number]
export { reactionsType, ReactionsType }
