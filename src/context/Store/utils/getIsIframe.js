/**
 * Determines if the app is in an iFrame
 * @returns {boolean} - whether or not the app instance is within an <iframe />
 */
const getIsIframe = () => {
  // Assume it is false because 99.999% of the time it will be false
  let result = false;

  try {
    if (typeof window === 'undefined') {
      return false;
    }

    result =
      window?.location !== window?.parent?.location && window?.self !== window?.top && Boolean(window?.frameElement);
  } catch (e) {
    console.error(e);
  }

  return result;
};

export default getIsIframe;
