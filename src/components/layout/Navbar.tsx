/**
 * Navbar — Good Move
 *
 * Uses the Navbar1 block from 21st.dev (shadcnblockscom/shadcnblocks-com-navbar1)
 * adapted with GoodMove brand data and Czech copy.
 *
 * Install original: npx shadcn@latest add https://21st.dev/r/shadcnblockscom/shadcnblocks-com-navbar1
 */
'use client'

import {
  Activity,
  HeartHandshake,
  Leaf,
  Users,
  BookOpen,
  Monitor,
} from 'lucide-react'
import { Navbar1 } from '@/components/blocks/shadcnblocks-com-navbar1'

// ─── GoodMove navigation data ─────────────────────────────────────────────────

const goodMoveNavData = {
  logo: {
    url: '/',
    src: '/logo.svg',
    alt: 'Good Move',
    title: 'Good Move',
  },
  menu: [
    {
      title: 'Domů',
      url: '/',
    },
    {
      title: 'Služby',
      url: '/sluzby',
      items: [
        {
          title: 'FyzioMove',
          description: 'Individuální fyzioterapie na základech vývojové kineziologie',
          icon: <Activity className="size-5 shrink-0" />,
          url: '/sluzby/fyziomove',
        },
        {
          title: 'SportMove',
          description: 'Fyziofitness a sportovní příprava pro aktivní jedince',
          icon: <HeartHandshake className="size-5 shrink-0" />,
          url: '/sluzby/sportmove',
        },
        {
          title: 'TeamMove',
          description: 'Skupinové pohybové lekce pro firmy i veřejnost',
          icon: <Users className="size-5 shrink-0" />,
          url: '/sluzby/teammove',
        },
        {
          title: 'KidsMove',
          description: 'Pohybový rozvoj a fyzioterapie pro děti',
          icon: <Leaf className="size-5 shrink-0" />,
          url: '/sluzby/kidsmove',
        },
        {
          title: 'EducaMove',
          description: 'Kurzy a vzdělávání pro fyzioterapeuty i laiky',
          icon: <BookOpen className="size-5 shrink-0" />,
          url: '/sluzby/educamove',
        },
        {
          title: 'OnlineMove',
          description: 'Online konzultace a cvičení odkudkoli',
          icon: <Monitor className="size-5 shrink-0" />,
          url: '/sluzby/onlinemove',
        },
      ],
    },
    {
      title: 'O nás',
      url: '/o-nas',
    },
    {
      title: 'Tým',
      url: '/tym',
    },
    {
      title: 'Ceník',
      url: '/cenik',
    },
    {
      title: 'Aktuality',
      url: '/aktuality',
    },
  ],
  mobileExtraLinks: [
    { name: 'Reference', url: '/reference' },
    { name: 'Kontakt', url: '/kontakt' },
    { name: 'Ochrana údajů', url: '/zasady-ochrany-osobnich-udaju' },
  ],
  auth: {
    login: {
      text: 'Kontakt',
      url: '/kontakt',
    },
    signup: {
      text: 'Rezervace',
      url: 'tel:+420603409782',
    },
  },
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function Navbar() {
  return <Navbar1 {...goodMoveNavData} />
}
