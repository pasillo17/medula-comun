export interface MythItem {
  id: string;
  tag: string;
  myth: string;
  reality: string;
  scientificDetail: string;
  category: 'procedimiento' | 'dolor_recuperacion' | 'requisitos' | 'alcance';
  highlight: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: 'columna',
    tag: 'Anatomía',
    myth: '“Te pinchan la columna vertebral o te sacan médula espinal”',
    reality: 'Totalmente falso. La médula ósea NO tiene nada que ver con la médula espinal.',
    scientificDetail: 'La médula espinal es un cordón de nervios del sistema nervioso dentro de la columna. La médula ósea es un tejido esponjoso y blando que fabrica sangre, alojado dentro de los huesos planos (como la pelvis). Además, en el 80% de los casos actuales, las células madre se extraen de la sangre de tu brazo sin tocar ningún hueso.',
    category: 'procedimiento',
    highlight: 'El 80% de las donaciones se hace por el brazo, exactamente igual que donar plaquetas o plasma.',
  },
  {
    id: 'dolor',
    tag: 'Dolor y Anestesia',
    myth: '“Es un procedimiento quirúrgico doloroso que te deja postrado”',
    reality: 'La donación es ambulatoria. El método más frecuente no usa anestesia ni deja dolor.',
    scientificDetail: 'En la donación por sangre periférica (aféresis), estás recostado en un sillón reclinable 3 a 4 horas leyendo o viendo una serie. Salís caminando por tus propios medios. Si el médico sugiere punción de cresta ilíaca (20% de casos), se aplica anestesia total: no sentís nada en el acto y solo sentís una molestia similar a un golpe deportivo durante 48 hs.',
    category: 'dolor_recuperacion',
    highlight: 'No hay internación prolongada ni dolor crónico. A los 2 o 3 días hacés tu vida habitual.',
  },
  {
    id: 'celulas_faltantes',
    tag: 'Regeneración',
    myth: '“Si dono mis células madre, me van a faltar a mí en el futuro”',
    reality: 'El cuerpo humano regenera el 100% de las células donadas en menos de 3 semanas.',
    scientificDetail: 'Las Células Progenitoras Hematopoyéticas (CPH) poseen autorrenovación celular continua. Donar una fracción no disminuye tus defensas de por vida ni altera tu sistema inmunológico a largo plazo.',
    category: 'dolor_recuperacion',
    highlight: 'Tus células madre se autorrenuevan y vuelven a su nivel original en 15 a 21 días.',
  },
  {
    id: 'tatuajes',
    tag: 'Condiciones de Salud',
    myth: '“Tengo tatuajes o piercings, entonces quedé vetado para siempre”',
    reality: 'Falso. Solo debés esperar 12 meses desde la última sesión.',
    scientificDetail: 'El período de ventana de 12 meses garantiza la seguridad virológica del receptor. Pasado el año, si tus análisis de sangre están en orden, podés inscribirte y donar sin ningún tipo de impedimento.',
    category: 'requisitos',
    highlight: 'Con 12 meses cumplidos desde tu último tattoo o piercing, estás 100% habilitado.',
  },
  {
    id: 'viaje_exterior',
    tag: 'Logística y Costos',
    myth: '“Si mi receptor vive en otro país, voy a tener que viajar al exterior y pagar pasajes”',
    reality: 'Nunca viajás al exterior ni pagás un centavo. Donás en tu hospital local en Argentina.',
    scientificDetail: 'El Registro Nacional (INCUCAI) y el Bone Marrow Donors Worldwide (BMDW) cubren íntegramente la logística criopreservada. Un correo médico acreditado viaja a buscar la bolsa de células madre extraída en tu centro y la lleva en avión refrigerada al receptor en menos de 48 horas.',
    category: 'alcance',
    highlight: 'El donante nunca tiene gastos económicos ni traslados forzados internacionales.',
  },
  {
    id: 'inmediato',
    tag: 'El Trámite',
    myth: '“Si me inscribo hoy, me van a llamar mañana mismo para donar”',
    reality: 'Inscribirse es solo poner tu código genético en espera solidaria.',
    scientificDetail: 'Para registrarte sólo donás una unidad de sangre normal de 450 ml. De ahí se extrae una muestra para analizar tus antígenos leucocitarios humanos (HLA). La probabilidad de match es de 1 en 40.000. Pueden pasar meses, años o nunca ser convocado; pero si un día alguien te necesita, sos su única chance en el planeta.',
    category: 'procedimiento',
    highlight: 'Inscribirte te toma 20 minutos. Donar médula solo ocurre si sos el match único de alguien.',
  }
];
