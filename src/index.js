import React, { useState, useEffect } from 'react'

import { NotificationManager, NotificationContainer } from 'react-notifications'

import { Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios'


export function useApi(url, ...params) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('will reload');
    setLoading(true);
    setResult(null);
    axios.get(url).then(r => {
      setResult(r.data);
      setLoading(false);
    });
  }, [url, ...params]);

  return [result, loading, setResult];
}


let mainComponents = {
}

const MainWrapper = ({ result, onChange }) => {
  const Component = mainComponents[result?.template]
  return (
    <>{Component && result && <Component {...{ ...result, onChange }} />}</>
  )
}

let wrapperComponents = {
  MainWrapper
}

const default_result_worth_processing = ({ result, loc, navigate }) => {
  if (result?.notification) {
    NotificationManager[result.notification.type]('', result.notification.text)
  }
  if (result?.redirect) {
    window.location.href = result.redirect
    return false
  }
  if (result?.navigate) {
    navigate(result.navigate)
    return false
  }
  return true
}

const gatherFileUids = (data) => {
  if (Array.isArray(data))
    return data.reduce((a, b) => ({ ...a, ...gatherFileUids(b) }), null)
  if (data && typeof data === 'object') {
    if (data.its_uid_for_file_to_upload_239r8h239rh239r) {
      const uid = data.its_uid_for_file_to_upload_239r8h239rh239r
      return { [uid]: window[uid].file }
    }
    return Object.entries(data).reduce(
      (a, [_, b]) => ({ ...a, ...gatherFileUids(b) }),
      null
    )
  }
}

/* global FormData */

const BaseLayout = ({ result_worth_processing_fn }) => {
  const result_worth_processing =
    result_worth_processing_fn || default_result_worth_processing
  const loc = useLocation()
  const navigate = useNavigate()
  const apiUrl = '/api' + loc.pathname + loc.search
  const [result, loading, _] = useApi(apiUrl, loc.key)

  /* const reload = () => {
    navigate(loc.pathname)
  } */
  useEffect(
    (_) => {
      console.log('GET API returned', result, window.actionToConsume)
      if (result?.current_date) window.current_date = result.current_date
      if (!result_worth_processing({ result, loc, navigate })) return
      if (window.actionToConsume) {
      }
    },
    [result]
  )

  const onChange = async (data, setErrors, customHandler) => {
    let resp
    if (window._react_form_has_files) {
      // console.log(gatherFileUids(data)); return;
      const formData = new FormData()
      for (const [k, v] of Object.entries(gatherFileUids(data))) {
        formData.append(k, v)
      }
      formData.append('data', JSON.stringify(data))
      resp = await axios.post(apiUrl, formData)
      /*
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
       */
    } else {
      resp = await axios.post(apiUrl, {
        data
      })
    }
    const result = resp.data
    console.log('POST API returned', resp)
    if (customHandler) {
      customHandler(result)
    } else {
      if (setErrors) setErrors(null, null)
      if (!result_worth_processing({ result, loc, navigate })) return
      if (result?.action === 'setErrors') {
        if (setErrors) setErrors(result.errors, result.error)
      }
      if (result?.action === 'closeWindow') {
        window.the_msg = result?.the_msg
        window.close()
      }
    }
    return resp.data
  }

  const Wrapper = wrapperComponents[result?.wrapper]

  if (result?.navigate || !Wrapper) return <div />

  return (
    <>
      <Wrapper {...{ loc, navigate, result, apiUrl, onChange }} />
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<BaseLayout />} />
        </Routes>
      </Router>
      <NotificationContainer enterTimeout={10} leaveTimeout={10} />
    </>
  );
}


export {
  BaseLayout,
  gatherFileUids,
  default_result_worth_processing,
  mainComponents,
  wrapperComponents,
  App,
}
