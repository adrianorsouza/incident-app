import dayjs from 'dayjs';
import { meta_level, meta_status, meta_types } from './metadata';

function findValue(value, obj) {
  for (let i of obj) {
    if (i.value === value) {
      return i.label;
    }
  }
  return 'Indefinido';
}

/**
 * Format the Incident Status.
 *
 * @param {String} value
 *
 * @return {String}
 * */
export const formatStatus = (value) => findValue(value, meta_status);

/**
 * Format the Incident Level.
 *
 * @param {String} value
 *
 * @return {String}
 * */
export const formatLevel = (value) => findValue(value, meta_level);

/**
 * Format the Incident Type.
 *
 * @param {String} value
 *
 * @return {String}
 * */
export const formatType = (value) => findValue(value, meta_types);

export const formatDateTime = (value) => {
  return value ? dayjs(value).format('DD/MM/YYYY HH[h]mm') : null;
};

export const formatResponseError = (e) => {
  if (e && e.message) {
    return e.message;
  }
  return 'Server Error';
};
