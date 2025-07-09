import { Technique } from './types';
import * as Techniques from './techniques';

export default class TechniqueFactory {
  static #techniques: Technique[];
  static #beginnerTechniques: Technique[];

  static getTechniques(): Technique[] {
    if (!TechniqueFactory.#techniques) {
      TechniqueFactory.#techniques = [
        ...TechniqueFactory.getBeginnerTechniques()
      ];
    }
    return TechniqueFactory.#techniques;
  }

  static getBeginnerTechniques(): Technique[] {
    if (!TechniqueFactory.#beginnerTechniques) {
      TechniqueFactory.#beginnerTechniques = [new Techniques.NakedSingle()];
    }
    return TechniqueFactory.#beginnerTechniques;
  }
}
