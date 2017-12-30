import { v4 as uuid } from 'uuid';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import {
  ADD_CAMPAIGN_ACTION,
  ADD_CLIENT_ACTION,
  ADD_KEYWORD_ACTION, CHANGE_NEW_KEYWORD_OPTION_ACTION, DELETE_CAMPAIGN_ACTION, EDIT_CAMPAIGN_ACTION,
  EDIT_CLIENT_ACTION,
  EDIT_KEYWORD_MODIFIER_ACTION,
  EDIT_KEYWORD_TEXT_ACTION,
  KeywordMatchingOptionsActions,
  REMOVE_ALL_KEYWORDS_ACTION,
  REMOVE_KEYWORD_ACTION, REMOVE_SELECTED_KEYWORD_ACTION, TOGGLE_KEYWORD_ALL_SELECTED_ACTION,
  TOGGLE_KEYWORD_SELECTED_ACTION
} from './keyword-matching-options.actions';

import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { ICampaign } from '../campaign.interface';

export function keywordMatchingOptionsReducer(state: IKeywordMatchingOptionsState, action: KeywordMatchingOptionsActions) {
  switch (action.type) {
    case ADD_KEYWORD_ACTION:
      const actionClient: Array<IClient> = state.clients.filter((client: IClient) => client.id === action.clientId);

      return {
        ...state,
        keywords: [{
          id: uuid(),
          clientId: action.clientId,
          text: action.text,
          modifier: action.modifier > -1 ? action.modifier : actionClient[0].matchOption, // Allow creating with Specific modifier, or use global one
          selected: false
        }, ...state.keywords]
      };
    case EDIT_KEYWORD_TEXT_ACTION:
      return {
        ...state,
        keywords: state.keywords.map((keyword: IKeyword) => {
          if (keyword.id === action.id) {
            keyword.text = action.text;
          }

          return keyword;
        })
      };
    case EDIT_KEYWORD_MODIFIER_ACTION:
      return {
        ...state,
        keywords: state.keywords.map((keyword: IKeyword) => {
          if (keyword.id === action.id) {
            keyword.modifier = action.modifier;
          }

          return keyword;
        })
      };
    case REMOVE_KEYWORD_ACTION:
      const keywords: Array<IKeyword> = state.keywords.filter((keyword: IKeyword) => {
        return keyword.id !== action.id;
      });

      return {
        ...state,
        keywords
      };
    case REMOVE_SELECTED_KEYWORD_ACTION:
      const nonSelectedKeywords: Array<IKeyword> = state.keywords.filter((keyword: IKeyword) => {
        return (keyword.clientId !== action.clientId) || !keyword.selected;
      });

      return {
        ...state,
        keywords: nonSelectedKeywords
      };
    case REMOVE_ALL_KEYWORDS_ACTION:
      const nonClientKeywords: Array<IKeyword> = state.keywords.filter((keyword: IKeyword) => {
        return keyword.clientId !== action.clientId;
      });

      return {
        ...state,
        keywords: nonClientKeywords
      };
    case TOGGLE_KEYWORD_SELECTED_ACTION:
      state.keywords.some((keyword: IKeyword) => {
        if (keyword.id === action.payload) {
          keyword.selected = !keyword.selected;

          return true;
        }
      });

      return {
        ...state,
        keywords: [...state.keywords]
      };
    case CHANGE_NEW_KEYWORD_OPTION_ACTION:
      return {
        ...state,
        clients: [
          ...state.clients.map((client: IClient) => {
            if (client.id === action.clientId) {
              client.matchOption = action.payload;
            }

            return client;
          })
        ]
      };
    case TOGGLE_KEYWORD_ALL_SELECTED_ACTION:
      const clientKeywords: Array<IKeyword> = state.keywords.filter((keyword: IKeyword) => {
        return keyword.clientId === action.clientId;
      });
      const anyUnselected = clientKeywords.some((keyword: IKeyword) => {
        return !keyword.selected;
      });

      return {
        ...state,
        keywords: state.keywords.map((keyword: IKeyword) => {
          keyword.selected = anyUnselected;

          return keyword;
        })
      };
    case ADD_CLIENT_ACTION:
      return {
        ...state,
        clients: [
          ...state.clients,
          {
            id: uuid(),
            name: action.name,
            matchOption: KeywordModifiers.BroadMatch,
            campaignIds: []
          }
        ]
      };
    case EDIT_CLIENT_ACTION:
      return {
        ...state,
        clients: state.clients.map((client: IClient) => {
          if (client.id === action.id) {
            client.name = action.name;
          }

          return client;
        })
      };
    case ADD_CAMPAIGN_ACTION:
      const campaignId = uuid();

      return {
        ...state,
        campaigns: [
          ...state.campaigns,
          {
            id: campaignId,
            name: action.name
          }
        ],
        clients: state.clients.map((client: IClient) => {
          if (client.id === action.clientId) {
            client.campaignIds.push(campaignId);
          }

          return client;
        })
      };
    case EDIT_CAMPAIGN_ACTION:
      return {
        ...state,
        campaigns: state.campaigns.map((campaign: ICampaign) => {
          if (campaign.id === action.id) {
            campaign.name = action.name;
          }

          return campaign;
        })
      };
    case DELETE_CAMPAIGN_ACTION: {
      const campaigns: Array<ICampaign> = state.campaigns.filter((campaign: ICampaign) => {
        return campaign.id !== action.id;
      });

      return {
        ...state,
        campaigns: campaigns
      };
    }
    default:
      return state;
  }
}
