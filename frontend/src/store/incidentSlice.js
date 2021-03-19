import { createSlice } from '@reduxjs/toolkit';
import { formatResponseError } from '../utils/formatters';
import request from '../utils/request';
import { url } from '../config';

const INITIAL_STATE = {
  list: [],
  loading: false,
  item: {},
  error: {
    create: null,
    list: null,
    update: null,
  },
  selected: {
    items: [],
    pending: false,
    error: null,
  },
};

export const incidentSlice = createSlice({
  name: 'incident',
  initialState: INITIAL_STATE,
  reducers: {
    loading: (state) => {
      if (state.loading === false) {
        state.loading = true;
      }
    },

    createItem: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.error.create = null;
      state.loading = false;
    },

    createItemError: (state, action) => {
      state.error.create = action.payload;
    },

    readItems: (state, action) => {
      if (state.loading === true) {
        state.error.list = null;
        state.loading = false;
        state.list = action.payload;
      }
    },

    readItemsError: (state, action) => {
      if (state.loading === true) {
        state.error.list = action.payload;
        state.loading = false;
      }
    },

    updateList: (state, action) => {
      state.list = action.payload;
    },

    deletePending: (state, action) => {
      state.selected.items = action.payload;
      state.selected.pending = true;
    },

    readItem: (state, action) => {
      state.item = action.payload;
    },

    updateItem: (state, action) => {
      state.item = {};
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
    },

    updateItemCancel: (state, action) => {
      state.item = {};
      state.error.update = null;
    },

    updateItemError: (state, action) => {
      state.error.update = action.payload;
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => id !== item.id);
      state.selected.items = state.selected.items.filter((i) => i !== id);
    },

    deleteComplete: (state, action) => {
      if (state.selected.pending === true) {
        state.selected.pending = false;
        state.selected.items = [];
        state.selected.error = null;
      }
    },

    deleteCancel: (state, action) => {
      state.selected.pending = false;
      state.selected.items = [];
      state.selected.error = null;
    },

    deleteItemError: (state, action) => {
      if (state.selected.pending === true) {
        state.selected.pending = false;
        state.selected.items = [];
        state.selected.error = action.payload;
      }
    },
  },
});

// Expose Actions
export const {
  loading,
  createItem,
  createItemError,
  readItems,
  readItemsError,
  readItem,
  updateItem,
  updateItemCancel,
  updateItemError,
  deletePending,
  deleteItem,
  deleteCancel,
  deleteComplete,
  deleteItemError,
} = incidentSlice.actions;

// Async Actions
export const fetchIncidentList = () => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await request.get(url.api.incident.read());
    if (res.status === 200) {
      const { data } = res.data;
      dispatch(readItems(data));
    }
  } catch (e) {
    dispatch(readItemsError(formatResponseError(e)));
  }
};

export const createIncident = (payload) => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await request.post(url.api.incident.create, payload);
    const { data } = res.data;
    dispatch(createItem(data));
  } catch (e) {
    dispatch(createItemError(formatResponseError(e)));
  }
};

export const deleteIncident = (items) => async (dispatch) => {
  dispatch(deletePending(items));
  try {
    let reqs = [];
    for (let i = 0; i < items.length; i++) {
      let row = items[i];
      await request.delete(url.api.incident.delete(row.id));
      reqs.push(row);
      dispatch(deleteItem(row.id));
    }

    const res = await Promise.all(reqs);
    dispatch(deleteComplete(res));
    return res;
  } catch (e) {
    dispatch(deleteItemError(e.message));
    throw new Error(e);
  }
};

export const updateIncident = (id, payload) => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await request.put(url.api.incident.update(id), payload);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch(updateItem(data));
    }
  } catch (err) {
    dispatch(updateItemError(formatResponseError(err)));
  }
};

// Selectors
export const selectIncident = (state) => state.incident;

export default incidentSlice.reducer;
