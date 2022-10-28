const products = [
  {
    name: 'Ingrid Noll - Kalt ist der Abendhauch',
    image: '/images/IngridNoll.jpeg',
    imageSecond: "/images/IngridNoll-1.jpeg",
    imageThird: "/images/IngridNoll-2.jpeg",
    description:
      'Diogenes Roman. Das Buch ist in einem sehr guten Zustand. Der Einband weist leichte Gebrauchsspuren aufn Die dreiundachtzigjährige Charlotte erwartet Besuch: Hugo, ihren Schwager, für den sie zeit ihres Lebens eine Schwäche hatte. Sollten sie doch noch einen romantischen Lebensabend miteinander verbringen können? Wird, was lange währt, endlich gut? Voll Sehnsucht schmiedet Charlotte Pläne, doch vor allem steigen Erinnerungen an ihre bewegte Vergangenheit in ihr auf...',
    category: 'Books',
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Cecelia Ahern - Ich schreib dir morgen wieder',
    image: '/images/CeceliaAhern.jpeg',
    description:
      'Der Spiegel Bestseller Roman von Cecelia Ahern ist in einem super Zustand ohne Gebrauchsspuren. \\n Tamara hat immer nur im Hier und Jetzt gelebt - und nie einen Gedanken an morgen verschwendet. Bis sie ein Tagebuch findet, in dem ihre Zukunft schon aufgezeichnet ist ... Nach dem Selbstmord ihres Vaters muss die junge Tamara aus ihrem Dubliner Glamour-Leben zu einfachen Verwandten aufs Land ziehen. Ihre Mutter ist vor Trauer über den Tod ihres Mannes kaum ansprechbar, und fernab ihrer Freunde fühlt sich Tamara völlig alleingelassen. Das einzig Interessante an dem abgelegenen Ort, an dem sie jetzt leben muss, scheint die ausgebrannte Ruine des alten Kilsaney-Schlosses. Doch dann entdeckt Tamara ein geheimnisvolles Buch: ein Tagebuch, in dem ihr eigenes Leben aufgeschrieben ist - und zwar immer schon der nächste Tag! Es führt Tamara zu den verborgenen Geheimnissen ihrer Familie und hilft ihr, den Weg zu Liebe und Zukunft zu finden.',
    category: 'Books',
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Roman von Ingrid Noll - Die Häupter meiner Lieben',
    image: '/images/RomanVonIngridNoll.jpeg',
    description:
      'Gebrauchter Zustand mit ein paar kleineren Mängeln (siehe Fotos).',
    category: 'Books',
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Roman von Paulo Coelho - Die Spionin',
    image: '/images/RomanVonPaulo.jpeg',
    description:
      'Gebrauchter, guter Zustand. \\n Wer ist die Frau hinter dem schillernden Mythos? Paulo Coelho schlüpft in ihre Haut und lässt sie in einem fiktiven, allerletzten Brief aus dem Gefängnis ihr außergewöhnliches Leben selbst erzählen: vom Mädchen Margaretha Zelle aus der holländischen Provinz zur exotischen Tänzerin Mata Hari, die nach ihren eigenen Vorstellungen lebte und liebte und so auf ihre Art zu einer der ersten Feministinnen wurde. Doch als der Erste Weltkrieg ausbricht, lässt sie sich auf ein gefährliches Doppelspiel ein.',
    category: 'Books',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Ulla Hahn - Spiel der Zeit',
    image: '/images/UllaHahn.jpeg',
    description:
      'Hilla Palm, Arbeiterkind vom Dorf, ist als Studentin in Köln angekommen. Im turbulenten Jahr 1967 sucht sie hier heimisch zu werden, erkundet die Welt der Sprache, genießt die Freiheit des Denkens, sehnt sich nach Orientierung im Leben und muss doch erkennen: Ich bin meine Vergangenheit. Erst als sie ihrer Liebe begegnet, findet sie die Kraft für einen neuen Blick auf alte Verletzungen. "Spiel der Zeit" ist ein Buch über die Jahre der Sehnsucht und Leidenschaft - ein mitreißender Entwicklungsroman und zugleich ein imposantes Epochengemälde der 68er Jahre, eine der radikalen Umbruchphasen in der Geschichte der Bundesrepublik.',
    category: 'Books',
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Der Teufel von Mailand Diogenes Martin Sutor Roman',
    image: '/images/DerTeufel.jpeg',
    description:
      'Sonias Sinne spielen verrückt: Sie sieht auf einmal Geräusche, schmeckt Formen oder fühlt Farben. Ein Aufenthalt in den Bergen soll ihr Gemüt beruhigen, doch das Gegenteil tritt ein: Im Spannungsfeld von archaischer Bergwelt und urbaner Wellness, bedrohlichem Jahrhundertregen und moderner Telekommunikation beginnt ihre überreizte Wahrnehmung erst recht zu blühen - oder gerät die Wirklichkeit aus den Fugen?',
    category: 'Books',
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Der Teufel von Mailand Diogenes Martin Sutor Roman',
    image: '/images/DerTeufel.jpeg',
    description:
      'Sonias Sinne spielen verrückt: Sie sieht auf einmal Geräusche, schmeckt Formen oder fühlt Farben. Ein Aufenthalt in den Bergen soll ihr Gemüt beruhigen, doch das Gegenteil tritt ein: Im Spannungsfeld von archaischer Bergwelt und urbaner Wellness, bedrohlichem Jahrhundertregen und moderner Telekommunikation beginnt ihre überreizte Wahrnehmung erst recht zu blühen - oder gerät die Wirklichkeit aus den Fugen?',
    category: 'Books',
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Dr. Oetker Backclub Magazine Gugelhupf Jg. 2019 komplett',
    image: '/images/Magazines1.jpeg',
    description:
      'Alle Zeitschriften aus dem Jahrgang 2019',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: '360 Grad Neuseeland Magazin Reise',
    image: '/images/Magazines2.jpeg',
    description:
      'sehr ordentlicher Zustand',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: '16 x HAPPINEZ Zeitschriften Magazine 2011-2019',
    image: '/images/Magazines3.jpeg',
    description:
      'Ich biete meine HAPPINEZ - Zeitschriften/Magazine Sammlung, 16 Hefte von 2011 - 2019, teilweise ungelesen, teilweise nur 1 Mal durchgeblättert, der Zustand ist Neuwertig inklusive komplett all der schönen Dinge, die da immer noch dabei sind wie Aufkleber, Karten, Arbeitsbögen uvm.',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Musicals Magazin Heft Zeitung',
    image: '/images/Magazines4.jpeg',
    description:
      'Musicals Magazin. Ausgaben 178 bis 215 sehr guter Zustand. Zustand: Neuwertig.',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: '22 Ausgaben Im Test - Deutschlands größtes Verbrauermagazin',
    image: '/images/Magazines5.jpeg',
    description:
      'Monat 1-12 2021 & Monat 1-10 2022',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'I AM Magazin von Laura Malina Seiler Nr. 9',
    image: '/images/Magazines6.jpeg',
    description:
      'Magazin von Laura Malina Seiler - ungelesen. Ich habe noch 4 andere Magazine.',
    category: 'Magazines',
    rating: 4,
    numReviews: 12,
  },
  {
    name: '29 LPs Die Geschichte der Popmusik',
    image: '/images/Music1.jpeg',
    description:
      'Die Geschichte der Popmusik in 29 LPs. Guter Zustand',
    category: 'Music',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'LP Vinyl Robert Palmer "Addictions, Volume 1" Orig. Pressung 1989',
    image: '/images/Music2.jpeg',
    description:
      'Ich biete an aus Privatsammlung: Robert Palmer "Addictions, Vol.1" 1989 mit den besten Hits. Es ist die deutsche Originalpressung Island Records 210 309 aus 1989. Hülle und Vinyl in sehr gutem Zustand.',
    category: 'Music',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Benjamin Blümchen- 2 CDs - Folgen 97 und 113',
    image: '/images/Music3.jpeg',
    description:
      'Biete zwei gehörte CDs von Benjamin Blümchen. Folge 97: Die Gespensterkinder. Folge 113: Der Abenteuer-Spielplatz',
    category: 'Music',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'CDs von TOTO',
    image: '/images/Music4.jpeg',
    description:
      '5 CDs von TOTO. Sie sind in einem guten Zustand.',
    category: 'Music',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'CD Allerlei',
    image: '/images/Music5.jpeg',
    description:
      'Cds Allerlei. Zustand: Sehr gut. Super Klassiker.',
    category: 'Music',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Breaking Bad DVD-Sets Staffel 1-4',
    image: '/images/Film1.jpeg',
    description:
      'Breaking Bad - Die Kultserie auf DVD. Wir bieten die DVD-Boxen der Staffeln 1, 2, 3 und 4 in sehr gutem Zustand. Alle Sets sind vollständig und unbeschädigt, keine Kratzer auf den DVDs.',
    category: 'Film',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Der Herr der Ringe Extended Editions/ Bluray 2022 Remastered',
    image: '/images/Film2.jpeg',
    description:
      'Biete hier die Extended Editions der "Herr der Ringe" - Trilogie auf Bluray (2022er Version), also vom Regisseur Peter Jackson komplett neu remastered.',
    category: 'Film',
    rating: 5,
    numReviews: 12,
    availability: false
  },
  {
    name: 'Trivial Pursuit 1990er Spiel',
    image: '/images/Games1.jpeg',
    description:
      'Zurück in die 1990er! Nur wenige Male bespielt. Neuwertig',
    category: 'Games',
    rating: 5,
    numReviews: 12,
  },
  {
    name: '18 verschiedene Kartenspiele',
    image: '/images/Games2.jpeg',
    description:
      'Bohnanza, Vampir, Rage, Wizard, 6 nimmt!, und viele weiter ...',
    category: 'Games',
    rating: 5,
    numReviews: 12,
  },
    {
    name: 'Nintendo 3DS Spiele',
    image: '/images/Games3.jpeg',
    description:
      'Wir bieten hier verschieden Nintendo 3DS Spiele',
    category: 'Games',
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Puzzle mit 1500 Teilen',
    image: '/images/Others1.jpeg',
    description:
      'Puzzle ist komplett',
    category: 'Others',
    rating: 5,
    numReviews: 12,
  }
]

export default products