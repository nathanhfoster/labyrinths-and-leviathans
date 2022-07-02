/* eslint-disable no-underscore-dangle */
const hasType = (object) => Boolean(object?.$$typeof);
const hasTypeAndContext = (object) => hasType(object) && Boolean(object._context);

const isValidContext = (context) =>
  (hasType(context) && hasTypeAndContext(context?.Provider)) || hasTypeAndContext(context?.Consumer);

export default isValidContext;
