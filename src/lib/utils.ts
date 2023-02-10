import { PokéGender, SpriteState } from "../components/PokémonDetailsModal";

/**
 * Converts a sprite state into a key that can be used to access
 * the sprite from the fetched pokémon data
 * @param state The state of the sprite
 *
 * @example
 * // returns 'front_default'
 * constructSpriteKeyFromSpriteState({
 *    gender: 'male',
 *    face: 'front',
 *    shiny: false
 * })
 *
 * // returns 'back_shiny'
 * constructSpriteKeyFromSpriteState({
 *    gender: 'male',
 *    face: 'back',
 *    shiny: true
 * })
 *
 * // returns 'front_female'
 * constructSpriteKeyFromSpriteState({
 *    gender: 'female',
 *    face: 'front',
 *    shiny: false
 * })
 */
export function constructSpriteKeyFromSpriteState(state: SpriteState) {
  const firstPart = state.face;

  const secondPart = state.shiny ? "shiny" : null;

  const thirdPart = (() => {
    if (secondPart === null) return state.gender;

    if (state.gender === PokéGender.Female) return PokéGender.Female;

    return null;
  })();

  return [firstPart, secondPart, thirdPart].filter(Boolean).join("_");
}
