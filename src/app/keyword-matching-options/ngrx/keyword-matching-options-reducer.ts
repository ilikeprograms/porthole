import { v4 as uuid } from 'uuid';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import {
  ADD_ADGROUP_ACTION,
  ADD_CAMPAIGN_ACTION,
  ADD_CLIENT_ACTION,
  ADD_KEYWORD_ACTION, CHANGE_NEW_KEYWORD_OPTION_ACTION, DELETE_ADGROUP_ACTION, DELETE_CAMPAIGN_ACTION,
  EDIT_CAMPAIGN_ACTION,
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
import { IAdgroup } from '../adgroup-interface';

export function keywordMatchingOptionsReducer(state: IKeywordMatchingOptionsState, action: KeywordMatchingOptionsActions) {
  switch (action.type) {
    case ADD_KEYWORD_ACTION:
      const actionAddgroup: IAdgroup = state.adgroups.entities[action.addroupId];
      const keywordId = uuid();
      const newKeyword: IKeyword = {
        id: keywordId,
        clientId: '',
        adgroupId: action.addroupId,
        text: action.text,
        modifier: action.modifier > -1 ? action.modifier : actionAddgroup.matchOption, // Allow creating with Specific modifier, or use global one
        selected: false
      };

      return {
        ...state,
        adgroups: Object.assign({}, state.adgroups, {
          entities: {
            ...state.adgroups.entities,
            [actionAddgroup.id]: {
            ...actionAddgroup,
              keywordIds: [
                ...state.adgroups.entities[actionAddgroup.id].keywordIds,
                keywordId
              ]
            }
          }
        }),
        keywords: Object.assign({}, {[keywordId]: newKeyword}, state.keywords)
      };
    case EDIT_KEYWORD_TEXT_ACTION:
      return {
        ...state,
        keywords: Object.assign({}, state.keywords, {[action.id]: {
          ...state.keywords[action.id],
          text: action.text
        }})
      };
    case EDIT_KEYWORD_MODIFIER_ACTION:
      return {
        ...state,
        keywords: Object.assign({}, state.keywords, {[action.id]: {
          ...state.keywords[action.id],
          modifier: action.modifier
        }})
      };
    case REMOVE_KEYWORD_ACTION:
      const keys: { [key: string]: IKeyword } = Object.assign({}, state.keywords);

      delete keys[action.id];

      const addgroupToRemoveKeyword: IAdgroup = state.adgroups.entities[action.addgroupId];
      const newAdGroup = Object.assign({}, addgroupToRemoveKeyword);

      newAdGroup.keywordIds.splice(newAdGroup.keywordIds.indexOf(action.id), 1);

      return {
        ...state,
        keywords: keys,
        adgroups: Object.assign({}, state.adgroups, {
          entities: {
            ...state.adgroups.entities,
            [action.addgroupId]: newAdGroup
          }
        })
      };
    case REMOVE_SELECTED_KEYWORD_ACTION:
      const keysToRemoveFromBoth: Array<string> = [];
      const keysToRemoveSelected: { [key: string]: IKeyword } = Object.assign({}, state.keywords);

      const addgroupToRemoveSelectedKeyword: IAdgroup = Object.assign({}, state.adgroups.entities[action.addgroupId]);
      addgroupToRemoveKeyword.keywordIds.forEach((keywordToRemoveSelectedId: string) => {
        if (keysToRemoveSelected[keywordToRemoveSelectedId].selected) {
          keysToRemoveFromBoth.push(keywordToRemoveSelectedId);
        }
      });

      keysToRemoveFromBoth.forEach((keywordToRemoveSelectedId: string) => {
        delete keysToRemoveSelected[keywordToRemoveSelectedId];
        addgroupToRemoveSelectedKeyword.keywordIds.splice(addgroupToRemoveSelectedKeyword.keywordIds.indexOf(keywordToRemoveSelectedId), 1);
      });

      return {
        ...state,
        keywords: keysToRemoveSelected,
        adgroups: Object.assign({}, state.adgroups, {
          entities: {
            ...state.adgroups.entities,
            [action.addgroupId]: addgroupToRemoveSelectedKeyword
          }
        })
      };
    case REMOVE_ALL_KEYWORDS_ACTION:
      const keysToRemoveAllSelected: { [key: string]: IKeyword } = Object.assign({}, state.keywords);
      const addgroupToRemoveAllSelectedKeyword: IAdgroup = Object.assign({}, state.adgroups.entities[action.addgroupId]);

      addgroupToRemoveAllSelectedKeyword.keywordIds.forEach((keywordToRemoveSelectedId: string) => {
        delete keysToRemoveAllSelected[keywordToRemoveSelectedId];
      });

      addgroupToRemoveAllSelectedKeyword.keywordIds = [];

      return {
        ...state,
        keywords: keysToRemoveAllSelected,
        adgroups: Object.assign({}, state.adgroups, {
          entities: {
            ...state.adgroups.entities,
            [action.addgroupId]: addgroupToRemoveAllSelectedKeyword
          }
        })
      };
    case TOGGLE_KEYWORD_SELECTED_ACTION:
      const keywordToToggle = Object.assign({}, state.keywords[action.id]);

      keywordToToggle.selected = !keywordToToggle.selected;

      return {
        ...state,
        keywords: Object.assign({}, state.keywords, {[action.id]: keywordToToggle})
      };
    case CHANGE_NEW_KEYWORD_OPTION_ACTION:
      const changeNewKeywordAdgroup: IAdgroup = Object.assign({}, state.adgroups.entities[action.addgroupId]);

      changeNewKeywordAdgroup.matchOption = action.payload;

      return {
        ...state,
        adgroups: Object.assign({}, state.adgroups, {
          entities: {
            ...state.adgroups.entities,
            [action.addgroupId]: changeNewKeywordAdgroup
          }
        })
      };
    case TOGGLE_KEYWORD_ALL_SELECTED_ACTION:
      const keywordsToToggleAll = Object.assign({}, state.keywords);

      const anySelected: boolean = Object.keys(keywordsToToggleAll).some((keywordToToggleId: string) => {
        if (keywordsToToggleAll[keywordToToggleId].adgroupId !== action.addgroupId) {
          return false;
        }

        return keywordsToToggleAll[keywordToToggleId].selected;
      });

      Object.keys(keywordsToToggleAll).forEach((keywordToToggleId: string) => {
        if (keywordsToToggleAll[keywordToToggleId].adgroupId === action.addgroupId) {
          keywordsToToggleAll[keywordToToggleId].selected = !anySelected;
        }
      });

      return {
        ...state,
        keywords: keywordsToToggleAll
      };
    case ADD_CLIENT_ACTION:
      const addClientId = uuid();

      return {
        ...state,
        clients: Object.assign({}, state.clients, {
          [addClientId]: {
            id: addClientId,
            name: action.name,
            matchOption: KeywordModifiers.BroadMatch,
            campaignIds: []
          }
        })
      };
    case EDIT_CLIENT_ACTION:
      const editClient: IClient = Object.assign({}, state.clients[action.id], {
        name: action.name
      });

      return {
        ...state,
        clients: Object.assign({}, state.clients, {[action.id]: editClient})
      };
    case ADD_CAMPAIGN_ACTION:
      const campaignId = uuid();
      const editClientCampaign: IClient = Object.assign({}, state.clients[action.clientId], {
        campaignIds: state.clients[action.clientId].campaignIds.concat(campaignId)
      });

      return {
        ...state,
        campaigns: Object.assign({}, state.campaigns, {
          [campaignId]: {
            id: campaignId,
            name: action.name
          }
        }),
        clients: Object.assign({}, state.clients, {[action.clientId]: editClientCampaign})
      };
    case EDIT_CAMPAIGN_ACTION:
      const editCampaign: ICampaign = Object.assign({}, state.campaigns[action.id], {
        name: action.name
      });

      return {
        ...state,
        campaigns: Object.assign({}, state.campaigns, {[action.id]: editCampaign})
      };
    case DELETE_CAMPAIGN_ACTION:
      const campaigns = Object.assign({}, state.campaigns);

      delete campaigns[action.id];

      return {
        ...state,
        campaigns: campaigns
      };
    case ADD_ADGROUP_ACTION:
      const newAdgroupId: string = uuid();

      return {
        ...state,
        adgroups: Object.assign({}, state.adgroups, {
          ids: state.adgroups.ids.concat(newAdgroupId),
          entities: {
            ...state.adgroups.entities,
            [newAdgroupId]: {
              id: newAdgroupId,
              campaignId: action.campaignId,
              name: action.name,
              matchOption: KeywordModifiers.BroadMatch,
              keywordIds: []
            }
          }
        })
      };
    case DELETE_ADGROUP_ACTION:
      const adgroupEntities = Object.assign({}, state.adgroups.entities);
      const keywords = Object.assign({}, state.keywords);

      state.adgroups.entities[action.id].keywordIds.forEach((adgroupKeywordId: string) => {
        delete keywords[adgroupKeywordId];
      });

      const ids: Array<string> = [...state.adgroups.ids];

      ids.splice(ids.indexOf(action.id), 1);

      delete adgroupEntities[action.id];

      return {
        ...state,
        keywords: keywords,
        adgroups: {
          ids: ids,
          entities: adgroupEntities
        }
      };
    default:
      return state;
  }
}
