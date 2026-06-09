export const load = () => {
  return {
    announcements: [
      {
        slug: 'volna-roka-1',
        title: 'Волна рока',
        imgSrc: "/test-data/event-bg1.png",
        address: 'Шхеры, ул. Книповича 46',
        genres: [{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}],
        date: new Date(2026 ,07, 20)
      },
      {
        slug: 'siniy-barhat',
        imgSrc: "/test-data/event-bg2.png",
        title: 'Синий бархат',
        address: 'Шхеры, ул. Книповича 46',
        genres: [{id: 2, name: 'Инди'}, {id: 1, name: 'Рок'}],
        date: new Date(2026 ,07, 20)
      }
    ]
  }
}