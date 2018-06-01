export const ADD_SUGGESTION = 'ADD_SUGGESTION';
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
export const APPROVE_SUGGESTION = 'APPROVE_SUGGESTION';

export function addSuggestion(item, exist = false) {
  return { type: ADD_SUGGESTION, item, exist };
}

export function removeSuggestion(index) {
  return { type: REMOVE_SUGGESTION, index };
}

export function approveSuggestion(item, exist = false) {
  return { type: APPROVE_SUGGESTION, item, exist };
}

export const initialState = {
  userSuggestions: [],
  approvedSuggestion: [],
};

export default function suggestionReducer(state = initialState, action) {
  state = { ...state };

  switch (action.type) {
    case ADD_SUGGESTION:
      if (!action.exist) {
        state.userSuggestions = [...state.userSuggestions, action.item];
      }
      else {
        const data = [...state.userSuggestions];
        const { customText, text, url, index, inputValue } = action.item;
        data[index] = { customText, text, url, inputValue };
        state.userSuggestions = data;
      }
      break;
    case REMOVE_SUGGESTION:
      const data = [...state.userSuggestions];
      data.splice(action.index, 1);
      state.userSuggestions = data;
      break;
    case APPROVE_SUGGESTION:
      if (!action.exist) {
        state.approvedSuggestion = [...state.approvedSuggestion, action.item];
      }
      else {
        const data = [...state.approvedSuggestion];
        const { customText, text, url, index } = action.item;
        data[index] = { customText, text, url };
        state.userSuggestions = data;
      }
      break;
  }

  return state;
}
