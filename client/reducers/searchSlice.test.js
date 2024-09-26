import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import searchSliceReducers from './searchSlice';
import {
  setSearchValue,
  setCurrentResults,
  addCachedSearches,
  addAllPreviousSearches,
} from './searchSlice';
describe('searchSlice reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      searchBarValue: '',
      currentResults: [],
      cachedSearches: {},
      allPreviousSearches: [],
    };
  });
  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(searchSliceReducers(undefined, {type: undefined})).toEqual(state);
    });
  });
  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = {type: 'qwdhjdkjh'}
      expect(searchSliceReducers(state, action)).toEqual(state);
    });
  });
  describe('set search value', () => {
    it('set the search value', () => {
      const action = setSearchValue('test new value');
      const { searchBarValue } = searchSliceReducers(state, action);
      expect(searchBarValue).toEqual('test new value');
    });
  });
  describe('set current Results', () => {
    it('add a new search value', () => {
      const action = setCurrentResults(['a new value']);
      const { currentResults } = searchSliceReducers(state, action);
      expect(currentResults).toEqual(['a new value']);
    });
  });
  describe('add cached search', () => {
    it('getting existing value from cached search and add new value to cached search', () => {
      const initialState = {
        searchBarValue: 'existing search',
        currentResults: [],
        cachedSearches: {
          'existing search': ['existing result1', 'existing result2']
        }
      }
      const action = setCurrentResults(initialState.cachedSearches[initialState.searchBarValue]);
      const newState = searchSliceReducers(initialState, action);
      expect(newState.currentResults).toEqual(['existing result1', 'existing result2']);
    });
    it('add new value to cached search', () => {
      const initialState = {
        searchBarValue: 'new search',
        currentResults: ['new result1', 'new result2'],
        cachedSearches: {
          'existing search': ['existing result1', 'existing result2']
        }
      }
      const action = addCachedSearches({
        searchBarValue: initialState.searchBarValue,
        currentResults: initialState.currentResults
      })
      const { cachedSearches } = searchSliceReducers(initialState, action);
      expect(cachedSearches['new search']).toEqual(['new result1', 'new result2']);
    });
  });
  describe('add All Previous Searches', () => {
    it('getting existing values from AllPreviousSearches list ', () => {
      const initialState = {
        allPreviousSearches: [{'common_name':'existing plant'}],
      }
      const action = setCurrentResults(initialState.allPreviousSearches);
      const newState = searchSliceReducers(initialState, action);
      expect(newState.currentResults).toEqual([{'common_name':'existing plant'}]);
    });
    it('add new values to AllPreviousSearches list', () => {
      const initialState = {
        allPreviousSearches: [{'common_name':'existing plant'}],
      };
      const newResults =  [
          {'common_name':'existing plant'},
          {'common_name':'new plant'}
      ];
      const action = addAllPreviousSearches(newResults);
      const newState = searchSliceReducers(initialState, action);
      expect(newState.allPreviousSearches).toEqual(
        [
          {'common_name':'existing plant'},
          {'common_name':'new plant'}
        ]
      );
    });
  });
});
