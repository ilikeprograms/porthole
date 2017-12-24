import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';

export const KeywordMatchingOptionsDefaultState: IKeywordMatchingOptionsState = {
  matchOption: KeywordModifiers.BroadMatch,
  keywords: [
    { modifier: KeywordModifiers.BroadMatch, text: 'Broad Match', selected: false },
    { modifier: KeywordModifiers.Negative, text: 'Negative', selected: false },
    { modifier: KeywordModifiers.BroadMatchModifier, text: 'Broad Match Modifier', selected: false },
    { modifier: KeywordModifiers.ExactMatch, text: 'Exact Match', selected: false }
    ]
}
