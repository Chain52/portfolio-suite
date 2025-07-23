import { Technique } from './types';
import * as Techniques from './techniques';
import { Difficulty } from '../../schema';

export default class TechniqueFactory {
  static #techniques: Technique[];
  static #beginnerTechniques: Technique[];

  static #getAllTechniques(): Technique[] {
    if (!TechniqueFactory.#techniques) {
      TechniqueFactory.#techniques = [
        ...TechniqueFactory.#getBeginnerTechniques()
      ];
    }
    return TechniqueFactory.#techniques;
  }

  static getTechniques(difficulty?: Difficulty): Technique[] {
    switch (difficulty) {
      case Difficulty.Easy:
        return TechniqueFactory.#getBeginnerTechniques();
      default:
        return TechniqueFactory.#getAllTechniques();
    }
  }

  static #getBeginnerTechniques(): Technique[] {
    if (!TechniqueFactory.#beginnerTechniques) {
      TechniqueFactory.#beginnerTechniques = [
        new Techniques.NakedSingle(),
        new Techniques.HiddenSingle()
      ];
    }
    return TechniqueFactory.#beginnerTechniques;
  }
}
