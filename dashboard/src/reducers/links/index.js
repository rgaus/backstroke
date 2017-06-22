import { COLLECTION_LINKS_SET } from '../../actions/collection/links/set';
import { COLLECTION_LINKS_SELECT } from '../../actions/collection/links/select';
import { COLLECTION_LINKS_ERROR } from '../../actions/collection/links/error';
import { COLLECTION_LINKS_START_LOADING } from '../../actions/collection/links/start-loading';
import { COLLECTION_LINKS_PUSH } from '../../actions/collection/links/push';

const initialState = {
  selected: null,
  loading: true,
  data: [],
  error: null,
  page: 0,
};

export default function links(state=initialState, action) {
  switch (action.type) {
  case COLLECTION_LINKS_START_LOADING:
    return {...state, loading: true};
  case COLLECTION_LINKS_ERROR:
    return {...state, error: action.error};
  case COLLECTION_LINKS_SET:
    return {...state, data: action.data, loading: false, page: action.page || 0};
  case COLLECTION_LINKS_SELECT:
    return {...state, selected: action.id};
  case COLLECTION_LINKS_PUSH:
    return {
      ...state,
      data: state.data.map(item => {
        if (action.item.id === item.id) {
          return action.item;
        } else {
          return item;
        }
      }),
    };
  default:
    return state;
  }
}
