/**
 * Contenu éditorial du site AgroMetha.
 * Modifier ce fichier pour changer les textes et chiffres — sans toucher aux animations.
 *
 * Marqueurs :
 *   confirmed: false  → affiché avec le badge [À CONFIRMER]
 *   placeholder: true → visuel / partenaire / coordonnée à remplacer
 */

export const site = {
  meta: {
    title: "AgroMetha — De déchets à énergie",
    description:
      "AgroMetha SARL construit à Péni, près de Bobo-Dioulasso, une centrale de méthanisation de 250 kW. 12 600 t/an de déchets organiques deviennent électricité renouvelable et engrais organiques — un écosystème de développement local.",
    url: "https://agrometha.bf",
    ogImage: "/placeholders/og.jpg",
  },

  nav: {
    cta: "Nous écrire",
    ctaHref: "#contact",
    sections: [
      { id: "hero", label: "Accueil" },
      { id: "accroche", label: "De déchets à énergie" },
      { id: "probleme", label: "Le constat" },
      { id: "collecte", label: "Collecte" },
      { id: "digesteur", label: "Digesteur" },
      { id: "biogaz", label: "Biogaz" },
      { id: "electricite", label: "Électricité" },
      { id: "digestat", label: "Engrais" },
      { id: "boucle", label: "La boucle" },
      { id: "impact", label: "Impact" },
      { id: "projet", label: "Le projet" },
      { id: "contact", label: "Contact" },
    ],
  },

  hero: {
    eyebrow: "AgroMetha SARL · Péni · Bobo-Dioulasso · Burkina Faso",
    wordmark: "AgroMetha",
    positioningLead: "Nous ne sommes pas un producteur d’électricité.",
    positioning:
      "Nous bâtissons un écosystème de développement local. En valorisant les déchets organiques du territoire, nous produisons une électricité renouvelable, des engrais organiques accessibles aux agriculteurs, et nous supprimons une nuisance environnementale — trois leviers d’une même filière.",
    pedagogy:
      "Ce site a un but simple : expliquer, étape par étape et sans jargon, ce qu’est la méthanisation et comment elle transforme un problème en ressource.",
    keyFigures: [
      { value: "12 600 t/an", label: "de déchets organiques valorisés" },
      { value: "250 kW", label: "de puissance électrique installée" },
      { value: "10 000 t/an", label: "d’engrais organiques produits" },
    ],
    scrollLabel: "Commencer le parcours",
  },

  accroche: {
    index: "00",
    label: "Le principe",
    titleBefore: "De",
    wordWaste: "déchets",
    titleMiddle: "à",
    wordEnergy: "énergie",
    body: "Entre les deux, un procédé biologique naturel : la méthanisation. Des bactéries digèrent la matière organique en l’absence d’oxygène et libèrent un gaz combustible. Voici comment, du camion de collecte au champ fertilisé.",
    scrollLabel: "Dérouler",
  },

  problem: {
    eyebrow: "01 — Le constat",
    title: "Trois problèmes, une seule cause",
    body: "Autour de Bobo-Dioulasso, la matière organique s’accumule sans filière de traitement. Elle pourrit à l’air libre et relâche du méthane. Pendant ce temps, les engrais chimiques s’importent à des prix qui explosent, et l’électricité manque.",
    highlight: {
      fact: "× 25",
      label:
        "Le méthane (CH₄) réchauffe 25 fois plus que le CO₂ sur 100 ans. Laissé s’échapper, c’est un gaz à effet de serre. Capturé, c’est un carburant.",
    },
    pains: [
      {
        id: "dechets",
        stat: "12 600 t/an",
        title: "Des déchets abandonnés",
        text: "Levures de brasserie, invendus de marchés, déchets de mangue, résidus de manioc, sous-produits d’abattoir : aucune filière ne les traite. Ils fermentent sur place, attirent les nuisibles et polluent les sols.",
      },
      {
        id: "engrais",
        stat: "100 %",
        title: "Des engrais importés",
        text: "Les engrais minéraux utilisés dans les Hauts-Bassins sont importés. Leur prix suit les cours mondiaux et grève la trésorerie des exploitations, année après année.",
      },
      {
        id: "electricite",
        stat: "58 %",
        title: "Une électricité dépendante",
        text: "Une large part de l’électricité consommée au Burkina Faso est importée. Le réseau est tendu, les délestages fréquents, et la production locale renouvelable reste marginale.",
      },
    ],
    streams: [
      { id: "brasserie", label: "Levures de brasserie" },
      { id: "marche", label: "Déchets de marchés" },
      { id: "mangue", label: "Déchets de mangue" },
      { id: "manioc", label: "Résidus de manioc" },
      { id: "abattoir", label: "Déchets d’abattoir" },
    ],
  },

  collection: {
    eyebrow: "02 — La collecte",
    title: "La matière est déjà là",
    body: "Pas d’importation, pas de culture dédiée. Cinq gisements identifiés dans un rayon de 40 km autour du site, soit 12 600 tonnes de matière organique par an — aujourd’hui perdues.",
    radiusLabel: "Rayon de collecte",
    radiusValue: "40 km",
    totalLabel: "Total collecté",
    totalValue: "12 600 t/an",
    centerLabel: "Centrale",
    centerSub: "Péni",
    sources: [
      {
        id: "brasserie",
        icon: "beer",
        title: "Levures de brasserie",
        tons: 3650,
        share: 29,
        text: "Un flux industriel régulier toute l’année, très riche en matière fermentescible — le socle de l’alimentation du digesteur.",
      },
      {
        id: "marches",
        icon: "store",
        title: "Déchets de marchés",
        tons: 3000,
        share: 24,
        text: "Fruits, légumes et restes d’étals collectés quotidiennement sur les marchés de l’agglomération.",
      },
      {
        id: "mangue",
        icon: "juice",
        title: "Déchets de mangue",
        tons: 2500,
        share: 20,
        text: "Écarts de tri et résidus des unités de séchage. Un gisement saisonnier massif, aujourd’hui laissé sur place.",
      },
      {
        id: "manioc",
        icon: "wheat",
        title: "Résidus de manioc",
        tons: 2000,
        share: 16,
        text: "Épluchures et pulpes des unités de transformation, une filière locale dense autour de Bobo-Dioulasso.",
      },
      {
        id: "abattoir",
        icon: "beef",
        title: "Déchets d’abattoir",
        tons: 1450,
        share: 11,
        text: "Sous-produits organiques à fort pouvoir méthanogène, dont l’élimination pose aujourd’hui un problème sanitaire.",
      },
    ],
  },

  digester: {
    eyebrow: "03 — Le digesteur",
    title: "Le cœur du procédé",
    body: "Une cuve hermétique de 2 500 m³, chauffée, sans oxygène. La matière y séjourne 45 à 60 jours. Dedans, des micro-organismes la transforment en biogaz — en quatre étapes biologiques successives.",
    specs: [
      { id: "volume", value: "2 500 m³", label: "Volume du digesteur" },
      { id: "sejour", value: "45–60 j", label: "Temps de séjour" },
      { id: "regime", value: "Mésophile", label: "Régime de température" },
    ],
    stagesTitle: "Les quatre étapes de la digestion anaérobie",
    stages: [
      {
        id: "hydrolyse",
        index: "01",
        title: "Hydrolyse",
        text: "Les bactéries découpent les grosses molécules — sucres, graisses, protéines — en morceaux solubles. La matière commence à se liquéfier.",
      },
      {
        id: "acidogenese",
        index: "02",
        title: "Acidogenèse",
        text: "Ces morceaux sont fermentés en acides gras volatils, en alcools et en hydrogène. Le milieu s’acidifie.",
      },
      {
        id: "acetogenese",
        index: "03",
        title: "Acétogenèse",
        text: "Les acides sont convertis en acétate, hydrogène et CO₂ — exactement le repas des micro-organismes de l’étape suivante.",
      },
      {
        id: "methanogenese",
        index: "04",
        title: "Méthanogenèse",
        text: "Les archées méthanogènes produisent le méthane. Le biogaz est né : environ 60 % de CH₄, 40 % de CO₂.",
      },
    ],
  },

  biogas: {
    eyebrow: "04 — Le biogaz",
    title: "Le gaz qui monte",
    body: "Le biogaz s’accumule sous le dôme du digesteur, rejoint un gazomètre qui lisse la production, puis alimente le moteur de cogénération. 660 000 normo-mètres cubes par an.",
    volume: { value: 660000, suffix: " Nm³/an", label: "Biogaz produit" },
    mix: [
      {
        id: "ch4",
        label: "Méthane (CH₄)",
        share: 60,
        note: "Le combustible : c’est lui qui porte l’énergie.",
      },
      {
        id: "co2",
        label: "Dioxyde de carbone (CO₂)",
        share: 40,
        note: "Inerte, non brûlé. Valorisable à terme (CO₂ alimentaire, industriel).",
      },
    ],
    steps: [
      {
        id: "dome",
        title: "Dôme",
        text: "Le gaz se sépare du liquide et s’accumule sous la membrane du digesteur.",
      },
      {
        id: "gasometer",
        title: "Gazomètre",
        text: "Un tampon de stockage souple, qui absorbe les à-coups de production.",
      },
      {
        id: "chp",
        title: "Moteur de cogénération",
        text: "Le gaz fait tourner un moteur qui produit simultanément électricité et chaleur.",
      },
    ],
  },

  electricity: {
    eyebrow: "05 — L’électricité",
    title: "Du moteur au réseau",
    body: "Le moteur de cogénération brûle le biogaz. L’énergie mécanique devient du courant, injecté sur le réseau de la SONABEL. La chaleur n’est pas perdue : elle maintient le digesteur à température et reste valorisable pour des usages voisins.",
    power: { value: 250, unit: "kW", label: "Puissance installée", confirmed: true },
    facts: [
      {
        id: "production",
        stat: "1,5 GWh/an",
        title: "Injectés au réseau",
        text: "La production annuelle est vendue en totalité à la SONABEL dans le cadre d’un contrat d’achat.",
      },
      {
        id: "tarif",
        stat: "70 FCFA/kWh",
        title: "Tarif de rachat",
        text: "Un revenu stable et contractualisé, indexé sur un tarif de rachat de l’électricité renouvelable.",
      },
      {
        id: "chaleur",
        stat: "Chaleur",
        title: "Récupérée, pas perdue",
        text: "La chaleur fatale du moteur chauffe le digesteur. Le surplus est mobilisable pour du séchage ou des usages industriels voisins.",
      },
    ],
  },

  digestate: {
    eyebrow: "06 — L’engrais",
    title: "Rien ne se jette",
    /**
     * `lead` remplace le mot technique « digestat » en tête de section et
     * remonte juste sous le titre. Le terme exact reste dans `definition`,
     * plus bas, pour le lecteur institutionnel qui l’attend.
     */
    lead: "Ce qui reste devient une ressource.",
    body: "La matière a donné son énergie ; il lui reste toute sa fertilité. Séparée en une part solide et une part liquide, elle redevient un engrais organique vendu aux agriculteurs du territoire — 10 000 tonnes par an.",
    definition:
      "Le nom technique est « digestat » : le résidu de la méthanisation. Riche en azote, phosphore et potassium sous une forme directement assimilable par les plantes, contrairement au fumier brut. Il remplace tout ou partie des engrais minéraux importés.",
    total: { value: 10000, suffix: " t/an", label: "Digestat produit" },
    outcomes: [
      {
        id: "solide",
        stat: "3 000 t/an",
        title: "Fraction solide",
        text: "Amendement de fond : elle restructure le sol, améliore la rétention d’eau et reconstitue le stock de matière organique.",
      },
      {
        id: "liquide",
        stat: "7 000 t/an",
        title: "Fraction liquide",
        text: "Fertilisation ciblée en cours de culture, plus simple à épandre et à effet rapide sur le rendement.",
      },
      {
        id: "souverainete",
        stat: "Boucle courte",
        title: "Moins d’engrais importés",
        text: "Une fertilisation produite sur place, à un prix décorrélé des cours mondiaux, pour les exploitations du bassin de Bobo-Dioulasso.",
      },
    ],
  },

  cycle: {
    eyebrow: "07 — La boucle",
    title: "Rien ne sort du cercle",
    body: "Déchets, biogaz, électricité, engrais, cultures : chaque sortie d’une étape devient l’entrée de la suivante. Ce n’est pas un slogan d’économie circulaire, c’est le schéma d’exploitation.",
    nodes: [
      { id: "dechets", label: "Déchets", detail: "12 600 t/an" },
      { id: "digesteur", label: "Digesteur", detail: "2 500 m³" },
      { id: "biogaz", label: "Biogaz", detail: "660 000 Nm³" },
      { id: "elec", label: "Électricité", detail: "1,5 GWh" },
      { id: "engrais", label: "Engrais", detail: "10 000 t" },
      { id: "cultures", label: "Cultures", detail: "Bassin de Péni" },
    ],
    revenueTitle: "Répartition théorique du chiffre d’affaires",
    revenue: [
      { id: "solide", label: "Engrais solide", share: 62 },
      { id: "elec", label: "Électricité", share: 29 },
      { id: "liquide", label: "Engrais liquide", share: 9 },
    ],
  },

  impact: {
    eyebrow: "08 — L’impact",
    title: "Ce que ça change, en chiffres",
    body: "Données de dimensionnement de la centrale de Péni. Les valeurs encore en cours de validation portent un marqueur explicite.",
    stats: [
      {
        id: "waste",
        value: 12600,
        decimals: 0,
        suffix: " t/an",
        label: "Déchets organiques valorisés",
        confirmed: true,
      },
      {
        id: "power",
        value: 250,
        decimals: 0,
        suffix: " kW",
        label: "Puissance installée",
        confirmed: true,
      },
      {
        id: "energy",
        value: 1.5,
        decimals: 1,
        suffix: " GWh/an",
        label: "Électricité injectée au réseau",
        confirmed: true,
      },
      {
        id: "biogas",
        value: 660000,
        decimals: 0,
        suffix: " Nm³/an",
        label: "Biogaz produit",
        confirmed: true,
      },
      {
        id: "fertilizer",
        value: 10000,
        decimals: 0,
        suffix: " t/an",
        label: "Engrais organiques produits",
        confirmed: true,
      },
      {
        id: "co2",
        value: 4500,
        decimals: 0,
        suffix: " t/an",
        label: "CO₂e évitées",
        confirmed: false,
      },
      {
        id: "jobs",
        value: 25,
        decimals: 0,
        suffix: "",
        label: "Emplois directs créés",
        confirmed: false,
      },
      {
        id: "surface",
        value: 2,
        decimals: 0,
        suffix: " ha",
        label: "Emprise du site à Péni",
        confirmed: true,
      },
    ],
  },

  project: {
    eyebrow: "09 — AgroMetha",
    title: "Une centrale, un territoire",
    mission:
      "AgroMetha SARL possède et exploitera une unité de méthanisation à Péni. Notre objet n’est pas de vendre des kilowattheures : c’est de créer, autour d’un même site, une filière de traitement des déchets, une production d’énergie renouvelable et une offre d’engrais organiques accessible aux agriculteurs du bassin.",
    location: {
      city: "Péni",
      region: "Hauts-Bassins",
      country: "Burkina Faso",
      detail: "à ~40 km de Bobo-Dioulasso",
      surface: "Terrain de 2 ha",
    },
    milestones: [
      { id: "site", label: "Site sécurisé", value: "2 ha à Péni", confirmed: true },
      { id: "gisement", label: "Gisement contractualisé", value: "12 600 t/an", confirmed: false },
      { id: "mes", label: "Mise en service visée", value: "2027", confirmed: true },
    ],
    vision:
      "Le modèle est réplicable : partout où un bassin urbain concentre des déchets organiques et un réseau électrique sous tension, la même unité peut être dupliquée. Péni est le premier site, pas le dernier.",
    photoLabel: "Carte de localisation — province du Houet",
    partnersTitle: "Partenaires",
    partners: [
      { name: "Brasserie locale", role: "Gisement — levures et effluents", confirmed: false },
      { name: "Abattoir de Bobo-Dioulasso", role: "Gisement — sous-produits organiques", confirmed: false },
      { name: "SONABEL", role: "Raccordement et achat de l’électricité", confirmed: false },
      { name: "Commune de Péni", role: "Foncier, gouvernance territoriale", confirmed: false },
      { name: "Bailleurs", role: "Financement climat et infrastructure", confirmed: false },
    ],
  },

  contact: {
    eyebrow: "10 — Contact",
    title: "Investisseurs, institutions, partenaires",
    body: "Un projet industriel, un dossier complet, un site sécurisé. Écrivez-nous : nous répondons aux demandes documentées.",
    form: {
      name: "Nom",
      org: "Organisation",
      email: "E-mail",
      role: "Vous êtes",
      roles: [
        { value: "investisseur", label: "Investisseur" },
        { value: "institution", label: "Institution / bailleur" },
        { value: "partenaire", label: "Partenaire industriel ou agricole" },
        { value: "autre", label: "Autre" },
      ],
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi…",
      success: "Message bien reçu. Nous revenons vers vous.",
      error: "L’envoi a échoué. Réessayez, ou écrivez-nous directement.",
    },
    details: {
      email: { value: "contact@agrometha.bf", confirmed: false },
      phone: { value: "+226 00 00 00 00", confirmed: false },
      address: { value: "Péni, Hauts-Bassins, Burkina Faso", confirmed: true },
    },
    socials: [{ id: "linkedin", label: "LinkedIn", href: "#", confirmed: false }],
  },

  footer: {
    legal: "AgroMetha SARL — méthanisation, Péni, Burkina Faso.",
    note: "Site vitrine. Les chiffres portant le marqueur [À CONFIRMER] sont des estimations en cours de validation.",
  },

  placeholders: [
    "Logo AgroMetha définitif (public/placeholders/logo.svg)",
    "Photo du terrain de Péni (remplace la carte si souhaité)",
    "Logos et noms exacts des partenaires",
    "E-mail et téléphone de contact",
    "CO₂e évitées / emplois directs",
    "Lien LinkedIn",
  ],
} as const;

export type ProjectPhoto = {
  /** Chemin depuis `public/`, ex. "/projet-peni.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Visuel section 09 — Le projet.
 * Carte Burkina Faso (province du Houet / Péni). Remplacer par une photo
 * terrain en gardant le même format.
 */
export const projectPhoto: ProjectPhoto | null = {
  src: "/projet-localisation.png",
  alt: "Localisation du projet AgroMetha — province du Houet, Hauts-Bassins, Burkina Faso",
  width: 480,
  height: 352,
};

export type SiteContent = typeof site;
export type SourceIconId = (typeof site.collection.sources)[number]["icon"];
