import type {SvelteHTMLElements} from "svelte/elements"

export type Band = {
  slug: string
  name: string
  miniImg: string
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

export type MusicEvent = {
  title: string
  slug: string
  imgSrc: SvelteHTMLElements["img"]["src"]
  genres: Array<Genre>,
  address: {
    name: string,
    coords: [number, number]
  }
  date: Date
}