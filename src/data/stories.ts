import heroDonorWarmthImg from '../assets/images/hero_donor_warmth_1792077092068.jpg';
import recipientGratitudeImg from '../assets/images/recipient_gratitude_1792077092380.jpg';
import donorProcessComfortImg from '../assets/images/donor_process_comfort_1792077093693.jpg';

export interface Story {
  id: string;
  name: string;
  role: 'donante' | 'receptora' | 'especialista';
  age?: number;
  location: string;
  headline: string;
  fullQuote: string;
  details: string;
  image: string;
  timeframe: string;
}

export const STORIES_DATA: Story[] = [
  {
    id: 'mateo-donante',
    name: 'Mateo Benítez',
    role: 'donante',
    age: 25,
    location: 'Caballito, CABA',
    headline: '“Me inscribí con una birra menos y 3 años después salvé a una nena en Francia”',
    fullQuote: 'Tenía todos los miedos clásicos: creía que me iban a perforar la columna con una aguja medieval. Cuando me llamaron del INCUCAI para decirme que era compatible 100%, me explicaron que era por aféresis de sangre. Estuve un martes a la mañana sentado en un sillón reclinable mirando una serie en la tablet con un té y galletitas. Al mediodía me fui a almorzar a mi casa.',
    details: 'Donó por Aféresis (sangre periférica). Compatibilidad HLA 10/10.',
    image: heroDonorWarmthImg,
    timeframe: 'Donación: Septiembre 2024',
  },
  {
    id: 'valentina-receptora',
    name: 'Valentina Rossi',
    role: 'receptora',
    age: 20,
    location: 'Rosario, Santa Fe',
    headline: '“Ninguno de mis hermanos era compatible. Un voluntario anónimo me dio mis 20 años”',
    fullQuote: 'A los 17 me diagnosticaron leucemia mieloblástica aguda. Los médicos nos dijeron que en la familia solo el 25% tiene match genético, y en mi caso no hubo coincidencia. Mi vida dependía de que alguien hubiera donado un tubo de sangre en algún lugar del mundo. El 14 de marzo llegó la bolsa con las células desde un donante registrado. Hoy estudio abogacía y entreno remo.',
    details: 'Trasplante alogénico no emparentado. Remisión completa.',
    image: recipientGratitudeImg,
    timeframe: 'Trasplante: 2023',
  },
  {
    id: 'mariana-especialista',
    name: 'Dra. Mariana Gómez',
    role: 'especialista',
    location: 'Servicio de Hemoterapia y Trasplante CPH',
    headline: '“La burocracia estatal aleja a los jóvenes; la verdad médica los convoca”',
    fullQuote: 'El mayor enemigo de la donación de médula no es la falta de solidaridad de la gente, sino el lenguaje gélido de los formularios oficiales y la confusión con la médula espinal. Cuando a un chico de 20 años le mostrás que registrarse es sólo un pinchazo de sangre común y que donar es un procedimiento seguro y ambulatorio, el 95% dice que sí al instante.',
    details: 'Médica Hematóloga especialista en Trasplante de CPH.',
    image: donorProcessComfortImg,
    timeframe: '15 años coordinando colectas externas',
  }
];
