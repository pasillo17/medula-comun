import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, ChevronRight, RotateCcw, MapPin, Calendar, Heart, Share2, Info } from 'lucide-react';

interface EligibilityState {
  ageRange: 'under18' | '18to40' | '41to59' | '60plus' | null;
  weightMin: boolean | null; // >= 50kg
  tattoosRecent: 'no' | 'less_12_months' | 'more_12_months' | null;
  chronicDiseases: boolean | null; // false = no diseases (healthy)
  pregnantOrNursing: 'no' | 'yes' | 'not_applicable' | null;
}

interface EligibilityValidatorProps {
  onFindCenters: () => void;
}

export const EligibilityValidator: React.FC<EligibilityValidatorProps> = ({ onFindCenters }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<EligibilityState>({
    ageRange: null,
    weightMin: null,
    tattoosRecent: null,
    chronicDiseases: null,
    pregnantOrNursing: null,
  });
  const [tattooMonthsAgo, setTattooMonthsAgo] = useState<number>(6);
  const [copiedLink, setCopiedLink] = useState(false);

  const totalSteps = 5;

  const resetQuiz = () => {
    setAnswers({
      ageRange: null,
      weightMin: null,
      tattoosRecent: null,
      chronicDiseases: null,
      pregnantOrNursing: null,
    });
    setStep(1);
  };

  // Outcome calculation
  const isComplete = step > totalSteps;

  const getEvaluation = () => {
    // Check age
    if (answers.ageRange === 'under18') {
      return {
        status: 'deferred',
        title: 'Casi listo: te esperamos al cumplir 18 años',
        description: 'La ley exige ser mayor de edad para consentir el ingreso al registro. Mientras tanto, podés compartir la iniciativa con amigos o familiares de entre 18 y 40 años.',
        canDonateNow: false,
        isPermanent: false,
        badgeColor: 'amber',
      };
    }
    if (answers.ageRange === '41to59') {
      return {
        status: 'age_limit',
        title: 'Límite de edad para nuevo registro (18 a 40 años)',
        description: 'Por normativas médicas internacionales y del INCUCAI, la inscripción en el registro se realiza hasta los 40 años inclusive (quienes ya están inscriptos permanecen hasta los 60). Podés colaborar como donante regular de sangre tradicional o difundiendo esta red.',
        canDonateNow: false,
        isPermanent: true,
        badgeColor: 'neutral',
      };
    }
    if (answers.ageRange === '60plus') {
      return {
        status: 'age_limit',
        title: 'Agradecemos de corazón tu compromiso cívico',
        description: 'A partir de los 60 años cesa la convocatoria para trasplante de médula para resguardar la salud del donante. Tu voz y apoyo para concientizar a las nuevas generaciones es fundamental.',
        canDonateNow: false,
        isPermanent: true,
        badgeColor: 'neutral',
      };
    }

    // Weight check
    if (answers.weightMin === false) {
      return {
        status: 'weight',
        title: 'Peso mínimo requerido: 50 kg',
        description: 'Para ingresar al registro es necesario donar una unidad estándar de sangre (450 ml). Por protocolo de seguridad médica, esta extracción solo se realiza a personas que pesen 50 kg o más para evitar mareos o descompensaciones.',
        canDonateNow: false,
        isPermanent: false,
        badgeColor: 'amber',
      };
    }

    // Chronic diseases
    if (answers.chronicDiseases === true) {
      return {
        status: 'chronic',
        title: 'Cuidado y protección de tu salud',
        description: 'Ciertas afecciones cardíacas, hepáticas, autoinmunes o antecedentes de infecciones transmisibles por sangre impiden la donación para cuidar tanto tu integridad como la del receptor inmunosuprimido.',
        canDonateNow: false,
        isPermanent: true,
        badgeColor: 'neutral',
      };
    }

    // Temporary: tattoos
    if (answers.tattoosRecent === 'less_12_months') {
      const monthsRemaining = Math.max(1, 12 - tattooMonthsAgo);
      return {
        status: 'temporary_tattoo',
        title: `¡Sos un gran candidato! Solo te faltan ${monthsRemaining} meses`,
        description: `Por tu tatuaje o piercing reciente debés cumplir el período de ventana biológico de 12 meses. Una vez transcurrido ese tiempo, vas a poder acercarte a cualquier centro sin ningún problema.`,
        canDonateNow: false,
        isPermanent: false,
        badgeColor: 'amber',
        monthsRemaining,
      };
    }

    // Temporary: pregnancy/nursing
    if (answers.pregnantOrNursing === 'yes') {
      return {
        status: 'temporary_pregnancy',
        title: 'Pausa temporal por maternidad o lactancia',
        description: 'Durante la gestación y hasta 6 meses posparto o finalizada la lactancia exclusiva, tu cuerpo necesita resguardar sus reservas de hierro y nutrientes. Podrás registrarte una vez finalizada esta etapa.',
        canDonateNow: false,
        isPermanent: false,
        badgeColor: 'amber',
      };
    }

    // Fully Eligible!
    return {
      status: 'eligible',
      title: '¡Estás 100% en condiciones de salvar una vida!',
      description: 'Cumplís con todos los requisitos biológicos y etarios del Registro Nacional de Donantes de CPH (INCUCAI). El siguiente paso es super simple: acercarte a donar una muestra de sangre a tu centro más próximo.',
      canDonateNow: true,
      isPermanent: false,
      badgeColor: 'emerald',
    };
  };

  const evalResult = isComplete ? getEvaluation() : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Médula Común - Comprobá si podés donar médula ósea',
        text: 'Acabo de hacer el validador rápido de donación de médula ósea. En 45 segundos sabés si sos compatible para salvar a un desconocido.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section id="validador" className="py-16 md:py-24 bg-white border-y border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 tracking-wide uppercase mb-2">
            <span>Autogestión Rápida</span>
            <span aria-hidden="true">·</span>
            <span>Sin Burocracia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Validador de Elegibilidad
          </h2>
          <p className="mt-3 text-neutral-600 text-base">
            Respondé 5 preguntas claras y descubrí al instante si podés registrarte hoy en el Registro Nacional de Donantes de CPH.
          </p>
        </div>

        {/* Validator Card Container */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {!isComplete ? (
            <div>
              {/* Stepper Progress */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Paso {step} de {totalSteps}
                  </span>
                  <span aria-hidden="true" className="text-neutral-300">·</span>
                  <span className="text-xs font-medium text-rose-600">
                    {step === 1 && 'Rango etario'}
                    {step === 2 && 'Masa corporal'}
                    {step === 3 && 'Tatuajes y perforaciones'}
                    {step === 4 && 'Historial de salud'}
                    {step === 5 && 'Maternidad'}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === step
                          ? 'w-8 bg-rose-600'
                          : s < step
                          ? 'w-2 bg-emerald-500'
                          : 'w-2 bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Age */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      ¿Cuántos años tenés actualmente?
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      El Registro Nacional (INCUCAI) inscribe a personas de entre 18 y 40 años para garantizar la mayor vitalidad celular y permanencia activa en la red mundial.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: 'under18' });
                        setStep(2);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 bg-white hover:border-rose-400 hover:bg-rose-50/40 transition-all text-neutral-900 group cursor-pointer"
                    >
                      <p className="font-semibold text-base group-hover:text-rose-700">Menor de 18 años</p>
                      <p className="text-xs text-neutral-500 mt-1">Todavía no alcancé la mayoría de edad.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: '18to40' });
                        setStep(2);
                      }}
                      className="p-4 text-left rounded-xl border-2 border-rose-600 bg-rose-50/30 hover:bg-rose-50 transition-all text-neutral-900 cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-base text-rose-800">Entre 18 y 40 años</p>
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Rango Óptimo</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">Edad estándar requerida para nueva inscripción oficial.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: '41to59' });
                        setStep(2);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all text-neutral-900 cursor-pointer"
                    >
                      <p className="font-semibold text-base">Entre 41 y 59 años</p>
                      <p className="text-xs text-neutral-500 mt-1">Fuera de nuevo registro (salvo inscriptos previos).</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, ageRange: '60plus' });
                        setStep(2);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all text-neutral-900 cursor-pointer"
                    >
                      <p className="font-semibold text-base">60 años o más</p>
                      <p className="text-xs text-neutral-500 mt-1">Edad de cese preventivo de donación.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Weight */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      ¿Pesás 50 kilogramos o más?
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Para registrarte debés donar una unidad regular de sangre (450 ml). El peso mínimo de 50 kg es una medida de resguardo estricta para evitar mareos o hipotensión.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, weightMin: true });
                        setStep(3);
                      }}
                      className="p-5 text-left rounded-xl border-2 border-neutral-200 hover:border-rose-600 bg-white hover:bg-rose-50/20 transition-all cursor-pointer"
                    >
                      <p className="font-bold text-lg text-neutral-900">Sí, peso 50 kg o más</p>
                      <p className="text-xs text-neutral-500 mt-1">Mi organismo tolera sin problemas la extracción de muestra.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, weightMin: false });
                        setStep(3);
                      }}
                      className="p-5 text-left rounded-xl border border-neutral-200 hover:border-neutral-400 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-semibold text-lg text-neutral-700">No, peso menos de 50 kg</p>
                      <p className="text-xs text-neutral-500 mt-1">Actualmente estoy por debajo de ese límite.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Tattoos / Piercings */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      ¿Te hiciste tatuajes, piercings o cirugías en los últimos 12 meses?
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Tener tatuajes NO te excluye para siempre. Solo se requiere esperar 12 meses desde la última sesión para garantizar que no existan ventanas virológicas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, tattoosRecent: 'no' });
                        setStep(4);
                      }}
                      className="p-4 text-left rounded-xl border-2 border-neutral-200 hover:border-rose-600 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-bold text-base text-neutral-900">No me hice ninguno en el último año (o nunca)</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Mis tatuajes o perforaciones tienen más de 12 meses de antigüedad.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, tattoosRecent: 'less_12_months' });
                        setStep(4);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 hover:border-amber-400 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-semibold text-base text-neutral-800">Sí, me hice uno hace menos de 12 meses</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Tengo un tatuaje o piercing reciente (requerirá espera temporaria).</p>
                    </button>
                  </div>

                  {answers.tattoosRecent === 'less_12_months' && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <p className="font-medium">¿Hace cuántos meses te lo hiciste aproximadamente?</p>
                      <div className="flex items-center gap-3 mt-2">
                        <input
                          type="range"
                          min="1"
                          max="11"
                          value={tattooMonthsAgo}
                          onChange={(e) => setTattooMonthsAgo(Number(e.target.value))}
                          className="w-full accent-amber-600 cursor-pointer"
                        />
                        <span className="font-bold text-sm w-16 tabular-nums">{tattooMonthsAgo} meses</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Health / Chronic conditions */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      ¿Tenés antecedentes de enfermedades crónicas graves o transmisibles por sangre?
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Por ejemplo: Hepatitis B o C, VIH/Sida, Chagas, enfermedades cardíacas severas, epilepsia bajo medicación continua o antecedentes de neoplasias (cáncer).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, chronicDiseases: false });
                        setStep(5);
                      }}
                      className="p-5 text-left rounded-xl border-2 border-neutral-200 hover:border-rose-600 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-bold text-lg text-neutral-900">No, gozo de buena salud</p>
                      <p className="text-xs text-neutral-500 mt-1">No padezco afecciones crónicas severas ni infecciosas en sangre.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, chronicDiseases: true });
                        setStep(5);
                      }}
                      className="p-5 text-left rounded-xl border border-neutral-200 hover:border-neutral-400 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-semibold text-lg text-neutral-700">Sí, tengo alguna de esas condiciones</p>
                      <p className="text-xs text-neutral-500 mt-1">Cuento con un diagnóstico médico o tratamiento crónico.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Pregnancy or Nursing */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      ¿Estás actualmente embarazada o amamantando?
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Durante el embarazo y la lactancia exclusiva, el cuerpo materno destina sus glóbulos rojos y hierro al bebé. Es una pausa transitoria de protección.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, pregnantOrNursing: 'no' });
                        setStep(6);
                      }}
                      className="p-4 text-left rounded-xl border-2 border-neutral-200 hover:border-rose-600 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-bold text-base text-neutral-900">No</p>
                      <p className="text-xs text-neutral-500 mt-1">No estoy cursando embarazo ni lactancia.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, pregnantOrNursing: 'yes' });
                        setStep(6);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 hover:border-amber-400 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-semibold text-base text-neutral-800">Sí, actualmente</p>
                      <p className="text-xs text-neutral-500 mt-1">Embarazo en curso o lactancia materna.</p>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, pregnantOrNursing: 'not_applicable' });
                        setStep(6);
                      }}
                      className="p-4 text-left rounded-xl border border-neutral-200 hover:border-rose-600 bg-white transition-all cursor-pointer"
                    >
                      <p className="font-semibold text-base text-neutral-800">No aplica</p>
                      <p className="text-xs text-neutral-500 mt-1">Soy varón / no gestante.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Back button */}
              {step > 1 && (
                <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-between">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    ← Volver a la pregunta anterior
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              {evalResult && (
                <div
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    evalResult.canDonateNow
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : evalResult.status.startsWith('temporary') || evalResult.status === 'under18'
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-neutral-100 border-neutral-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        evalResult.canDonateNow
                          ? 'bg-emerald-600 text-white'
                          : evalResult.status.startsWith('temporary') || evalResult.status === 'under18'
                          ? 'bg-amber-600 text-white'
                          : 'bg-neutral-600 text-white'
                      }`}
                    >
                      {evalResult.canDonateNow ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : evalResult.status.startsWith('temporary') || evalResult.status === 'under18' ? (
                        <Clock className="w-6 h-6" />
                      ) : (
                        <Heart className="w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            evalResult.canDonateNow
                              ? 'text-emerald-800'
                              : evalResult.status.startsWith('temporary') || evalResult.status === 'under18'
                              ? 'text-amber-800'
                              : 'text-neutral-700'
                          }`}
                        >
                          {evalResult.canDonateNow ? 'Resultado: Apto para Registro' : 'Resultado: Orientación Informada'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
                        {evalResult.title}
                      </h3>
                      <p className="text-neutral-700 mt-2 text-sm leading-relaxed">
                        {evalResult.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions according to result */}
                  <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {evalResult.canDonateNow ? (
                      <>
                        <button
                          onClick={onFindCenters}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Ver centros de donación más cercanos</span>
                        </button>
                        <a
                          href="#proceso"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold rounded-xl transition-all cursor-pointer"
                        >
                          <span>Ver cómo prepararte (qué desayunar)</span>
                        </a>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleShare}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir con amigos o familiares'}</span>
                        </button>
                        <button
                          onClick={onFindCenters}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold rounded-xl transition-all cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                          <span>Conocer más sobre el registro</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Reset Quiz bar */}
              <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                <span>¿Querés volver a verificar o responder por otra persona?</span>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar validador</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
