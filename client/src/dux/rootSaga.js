import { sportSagas } from './sports';
import { userSagas } from './users';


export default function* rootSaga() {
  yield [
    sportSagas,
    userSagas,
  ];
}
