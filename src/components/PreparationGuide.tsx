import React, { useState } from 'react';
import { Coffee, FileText, Moon, Heart, Calendar, MessageCircle, ChevronDown, ChevronUp, Download, Check } from 'lucide-react';

export const PreparationGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleDownloadIcs = () => {
    // Generate .ics file for calendar reminder
    const now = new Date();
    const eventDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days ahead
    eventDate.setHours(9, 0, 0, 0);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatIcsDate = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const start = formatIcsDate(eventDate);
    const end = formatIcsDate(new Date(eventDate.getTime() + 60 * 60 * 1000));

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Medula Comun//Recordatorio Donacion//ES',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'SUMMARY:Donar sangre e inscribirme al Registro de Médula Ósea (INCUCAI)',
      'DESCRIPTION:Recordá: Desayunar sin lácteos ni grasas (mate, té, café o frutas), llevar DNI y descansar bien.',
      'LOCATION:Centro de Hemoterapia más cercano',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'recordatorio-donacion-medula.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  const faqs = [
    {
      q: '¿Puedo donar si tomo anticonceptivos o fumo tabaco/marihuana?',
      a: 'Sí. El uso de pastillas anticonceptivas o DIU no interfiere en absoluto. El consumo de tabaco tampoco es excluyente (solo se sugiere no fumar 2 horas antes y después para evitar mareos). El consumo ocasional de cannabis tampoco impide el registro, siempre que no estés bajo efectos activos al momento de la extracción.',
    },
    {
      q: '¿Qué pasa si me mudo de ciudad o cambio de número de teléfono?',
      a: 'Es muy importante mantener tus datos actualizados para que el INCUCAI pueda localizarte si surge un match. Podés actualizar tu teléfono, email y domicilio en cualquier momento llamando al 0800-555-4628 (INCUCAI) o escribiendo a cph@incucai.gov.ar indicando tu número de DNI.',
    },
    {
      q: '¿Puedo arrepentirme si me llaman en el futuro para donar?',
      a: 'Sí, la donación en Argentina y el mundo es 100% libre y voluntaria en cada una de sus etapas. Si las circunstancias de tu vida cambiaron, podés manifestarlo. No obstante, por eso insistimos tanto en brindar información previa: para que cuando des el "sí", sea un compromiso consciente sabiendo que alguien puede estar esperando su única oportunidad de vida.',
    },
    {
      q: '¿Donar médula ósea te debilita las defensas o causa calvicie?',
      a: 'No, bajo ninguna circunstancia. No existe pérdida permanente de defensas ni caída del cabello. Las células madre hematopoyéticas se multiplican y regeneran por completo en menos de 3 semanas.',
    },
    {
      q: '¿Tengo que pagar algo o recibo algún certificado laboral?',
      a: 'Es totalmente gratuito. Además, por la Ley Nacional de Sangre (Ley 22.990) y convenios de trabajo, tenés derecho por ley a justificativo laboral y descanso pago el día de la donación para que tu empleo esté plenamente respaldado.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>Guía Práctica</span>
            <span aria-hidden="true">·</span>
            <span>El Día que Vas a Donar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Preparación para tu Registro
          </h2>
          <p className="mt-3 text-neutral-600 text-base">
            Cuatro recomendaciones elementales para tener una experiencia rápida, segura y placentera.
          </p>
        </div>

        {/* 4 Pillars of Preparation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Desayuno Liviano</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No vayas en ayunas total. Tomá mate, té, café negro o jugo con frutas. <strong>Evitá lácteos</strong> (leche, manteca, yogur, queso) y frituras 4 horas antes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">DNI con Foto</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Llevá tu Documento Nacional de Identidad, Pasaporte o Cédula vigente. Es obligatorio por ley para asociar inequívocamente tu código genético.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Buen Descanso</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dormí al menos 6 horas la noche previa y mantenete bien hidratado con agua durante el día. Evitá el consumo excesivo de alcohol la noche anterior.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-neutral-900 text-base">Refrigerio y Reposo</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tras la extracción de sangre, el servicio te convida con un refrigerio dulce y líquido durante 10 minutos para recuperar energía antes de continuar tu día.
            </p>
          </div>
        </div>

        {/* Calendar & Reminder Box */}
        <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50 rounded-2xl border border-rose-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
              Agendá tu Compromiso
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
              ¿Querés que te guardemos un recordatorio?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
              Descargá una cita para Google Calendar / Apple Calendar o compartilo con vos mismo para no colgarte e ir esta semana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {downloadedIcs ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloadedIcs ? '¡Recordatorio descargado!' : 'Descargar para Calendario (.ics)'}</span>
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-950">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Respuestas rápidas a las dudas más comunes de los potenciales donantes
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-neutral-900 text-sm hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
