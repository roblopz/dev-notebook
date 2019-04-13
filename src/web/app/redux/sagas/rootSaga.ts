import "regenerator-runtime/runtime";
import { all } from 'redux-saga/effects';

export default function* root() {
  yield all([]);
}