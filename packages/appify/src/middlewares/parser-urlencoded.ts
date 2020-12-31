import { urlencoded } from 'body-parser';

export default () => {
  return urlencoded({ extended: true })
}
