/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isFunction from 'lodash/isFunction';
import getIsIframe from '~context/Store/utils/getIsIframe';
import { MOBILE_PREVIEW_ID } from '~components/List/Content/MobilePreview/constants';
import useBooleanToggler from '~lib/utils/Hooks/useBooleanToggler';
import useEffectAfterMount from './useEffectAfterMount';

export const FIVE_SECOND_BUFFER = 5000;

/**
 * This hook posts messages to the iFrame version of the app rendered in the: src\components\layouts\List\Content\MobilePreview\Iframe\index.jsx
 * It isn't a perfect solution but it allows the iFrame to refresh when there are state changes
 * @param {string} displayName - the displayName for the state context for a provider
 * @param {object} state - the state value for a provider
 * @param {number} delay - how often the router.reload is debounced
 * @param {boolean} - whether or not the client is an iFrame
 */
const useIframeSync = ({ displayName, state, delay = 1600 }) => {
  const router = useRouter();
  const [isReady, toggleIsReady] = useBooleanToggler(false);
  const debouncedToggleIsReady = useCallback(
    debounce(toggleIsReady, FIVE_SECOND_BUFFER),
    [toggleIsReady]
  );

  const debouncedReload = useCallback(() => {
    const routerReload = isFunction(router.reload)
      ? router.reload.bind(router)
      : () => {
          console.log('would reload but router.reload is unavailable');
        };

    const reload = debounce(routerReload, delay);
    return reload();
  }, [router, delay]);

  // Give a 5 second buffer for the App to mount and the useEffectAfterMount hooks to work
  useEffect(() => {
    if (!isReady) {
      debouncedToggleIsReady(true);
    }
  });

  // After mount, listen for the message being sent from the app
  useEffectAfterMount(() => {
    const isIframe = getIsIframe();
    const shouldRecieveMessageForIframe = isReady && isIframe;

    if (shouldRecieveMessageForIframe) {
      window.addEventListener('message', debouncedReload);
    }

    return () => {
      if (shouldRecieveMessageForIframe) {
        window.removeEventListener('message', debouncedReload);
      }
    };
  }, [isReady, debouncedReload]);

  // After mount, listen for a context store state change and message the iframe to do a soft reload
  useEffectAfterMount(() => {
    try {
      const isIframe = getIsIframe();
      const shouldSendMessageToIframe = isReady && !isIframe;
      if (shouldSendMessageToIframe) {
        const mobilePreviewIframeElement =
          document.getElementById(MOBILE_PREVIEW_ID);
        if (mobilePreviewIframeElement) {
          const message = displayName;
          mobilePreviewIframeElement?.contentWindow?.postMessage?.(
            message,
            '*'
          );
        }
      }
    } catch (e) {
      console.log('failed to update mobile preview iframe');
      console.error(e);
    }
  }, [state, isReady, displayName]);

  return getIsIframe();
};

export default useIframeSync;
