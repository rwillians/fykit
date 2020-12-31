import { json } from 'body-parser';

export default () => {
  return json({
    strict: true,
    type: [
      'application/json',
      'application/*+json'
    ]
  })
}
