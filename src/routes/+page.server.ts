import type {Props} from "./+page/WeekNew.svelte"

type WeekNewItems = Props['data']
export const load = () => {
  const weekNew: WeekNewItems = [
    {
      group: {
        name: 'SKIT',
        slug: 'SKIT',
        genres: [
          {id: 0, name: 'metal'},
          {id: 1, name: 'metalcore'}
        ]
      },
      music: [
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Убей меня с помощью мертвого груза моих плеч и штанов карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]}
      ]
    },
    {
      group: {
        name: 'Bullet For My Valentine',
        slug: 'SKIT',
        genres: [
          {id: 0, name: 'metal'},
          {id: 1, name: 'metalcore'}
        ]
      },
      music: [
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]},
        {name: 'Снимаю штаны карго', previewImg: null, genres: [{id: 0, name: 'metal'}, {id: 0, name: 'reggae'}]}
      ]
    }
  ]
  return {
    weekNew,
    algoSelect: weekNew,
  }
}