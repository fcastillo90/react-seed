/* eslint-disable import/prefer-default-export */
import { getFromApi, postToApi } from '@services'
import Settings from '@services/Settings'
import { onSuccess, onError, onPending } from '@services/Common'

export const onGetExample = () =>
  getFromApi({
    url: Settings.buildUrl(Settings.urls.apiUrl, Settings.path.apiPath, {
      query: 'string',
    }),
    onSuccess,
    onError,
    onPending,
  })

export const onPostExample = (body) =>
  postToApi({
    body,
    url: Settings.buildUrl(Settings.urls.apiUrl, Settings.path.composedPath('example')),
    onSuccess,
    onError,
    onPending,
  })
