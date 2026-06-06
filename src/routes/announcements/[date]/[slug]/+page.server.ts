export function load(e) {
  return {
    entranceAnimation: e.request.headers.get('referer')?.endsWith('/announcements') ?? false,
    event: {
      slug: 'volna-roka-1',
      title: 'Волна рока',
      imgSrc: "/test-data/event-bg1.png",
      address: 'Шхеры, ул. Книповича 46',
      genres: [{id: 0, name: 'Метал'}, {id: 1, name: 'Рок'}],
      date: new Date(2026 ,7, 20)
    }
  }
}