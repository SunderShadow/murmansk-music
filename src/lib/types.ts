export type Group = {
  slug: string
  name: string
  genres: Array<Genre>
}

export type Album = {
  name: string
  genres: Array<Genre>
}

export type Music = {
  name: string
  previewImg: string|null,
  genres: Array<Genre>
}

export type Genre = {
  id: number
  name: string
}