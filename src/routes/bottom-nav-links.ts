import NewspaperIcon from "$lib/icons/Newspaper.svelte"
import TicketIcon from "$lib/icons/Ticket.svelte"
import HandshakeIcon from "$lib/icons/Handshake.svelte"
import AudioLinesIcon from "$lib/icons/AudioLines.svelte"
import GuitarIcon from "$lib/icons/Guitar.svelte"
import type {Link as BottomNavLink} from "./+layout/BottomNav.svelte"

export default [
  {
    icon: NewspaperIcon,
    name: 'Доска',
    href: '/'
  },
  {
    icon: TicketIcon,
    name: 'Анонсы',
    href: '/announcements'
  },
  // {
  //   icon: HandshakeIcon,
  //   name: 'Коллаба',
  //   href: '/collaborations'
  // },
  // {
  //   icon: AudioLinesIcon,
  //   name: 'Подкасты',
  //   href: '/podcasts'
  // },
  {
    icon: GuitarIcon,
    name: 'Группы',
    href: '/bands'
  },
] as Array<BottomNavLink>