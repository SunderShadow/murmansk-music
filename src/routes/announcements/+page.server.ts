import type {Props as EventProps} from "$lib/components/AnnounceCard/AnnounceCard.svelte"

export const load = () => {
  return {
    events: [
      {
        slug: 'volna-roka',
        title: 'Волна рока',
        imgSrc: "/test-data/event-bg1.png",
        address: 'Шхеры, ул. Книповича 46',
        genres: [{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}],
        date: new Date()
      },
      {
        slug: 'siniy-barhat',
        imgSrc: "/test-data/event-bg2.png",
        title: 'Синий бархат',
        address: 'Шхеры, ул. Книповича 46',
        genres: [{id: 2, name: 'Инди'}, {id: 1, name: 'Рок'}],
        date: new Date()
      },
      {
        slug: 'volna-roka',
        title: 'Волна рока',
        imgSrc: "/test-data/event-bg1.png",
        address: 'Шхеры, ул. Книповича 46',
        genres: [{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}],
        date: new Date()
      },
    ] as EventProps[]
  }
}