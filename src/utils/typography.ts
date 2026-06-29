const PREPOSITIONS = /(\s)(в|и|а|с|к|у|о|во|со|ко|из|от|до|на|за|по|об|но|же|то|ни|бы|или|для|при|без|над|про|через)\s/gi;

export function nb(text: string): string {
  return text.replace(PREPOSITIONS, (_, space, prep) => `${space}${prep}\u00A0`);
}
