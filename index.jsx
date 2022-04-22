import React, { useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import ReactDOM from 'react-dom'

import Editable, { LocaleContextWrapper } from 'tuya-alioth'

import axios from 'axios'


const getNatureInfo = (
  url,
) => {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve({
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      })
    }
    image.onerror = () => {
      resolve({
        naturalWidth: 200,
        naturalHeight: 100,
      })
    }
  })
}

const App = () => {
  const ref = useRef()

  const onCopyAnchor = useMemoizedFn((id) => {
    alert(`copy anchor success ${id}`)
  })

  const onMentionSearch = useMemoizedFn(() => {
    return Promise.resolve([
      {
        name: '小明',
        id: '0001',
        avatar:
          'https://p.qlogo.cn/bizmail/FCHScGYUGQw3EcicoD2RmVSzsrTMdH6L2l0ev6ICIIn1Y8jvbk40gvw/0',
        email: 'xiaoming@163.com',
        originalInfo: JSON.stringify({ a: 1 }),
      },
      {
        name: '张三',
        id: '0002',
        avatar:
          'http://wework.qpic.cn/bizmail/yFo0DN3KicZvA1QPxtibDLyj4ibTLl69E5dJUaTSWXicP3hicc8ic7csyibpg/100',
        email: 'zhangsan@163.com',
        originalInfo: JSON.stringify({ a: 1 }),
      },
    ])
  })

  const onTrrigerUpload = useMemoizedFn(async (file, options) => {
    const fd = new FormData()
    fd.append('upload_preset', 'xohwwhuf')
    fd.append('tags', 'browser_upload') // Optional - add tag for image admin in Cloudinary
    fd.append('file', file)
    const res = await axios.post('https://api.cloudinary.com/v1_1/alioth/upload', fd, {
      onUploadProgress: (progressEvent) => {
        const process = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        )
        options.onProcess(process)
      },
    })

    return {
      fileUrl: res.data.url,
      originalWidth: res.data.width,
      originalHeight: res.data.height,
    }
  })

  const onTransformUrl = useMemoizedFn(async (url, options) => {
    // const fd = new FormData()
    // fd.append('upload_preset', 'xohwwhuf')
    // fd.append('tags', 'browser_upload') // Optional - add tag for image admin in Cloudinary
    // fd.append('file', url)
    // const res = await axios.post('https://api.cloudinary.com/v1_1/alioth/upload', fd, {
    //   onUploadProgress: (progressEvent) => {
    //     const process = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total,
    //     )
    //     options.onProcess(process)
    //   },
    // })

    // return {
    //   fileUrl: res.data.url,
    //   originalWidth: res.data.width,
    //   originalHeight: res.data.height,
    // }
    return new Promise((resolve) => {
      let process = 0
      const interval = setInterval(() => {
        process += 1
        options?.onProcess?.(process)
        if (process === 100) {
          clearInterval(interval)
          getNatureInfo(url).then((info) => {
            resolve({
              fileUrl: url,
              originalWidth: info.naturalWidth,
              originalHeight: info.naturalHeight,
            })
          })
        }
      }, 100)
    })
  })

  const onDownloadAttachment = useMemoizedFn(({ fileUrl, fileKey }) => {
    alert('download attachment')
  })

  const onPreviewAttachment = useMemoizedFn(({ fileUrl, fileKey }) => {
    alert('preview attachment')
  })

  const onSave = useMemoizedFn((data) => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data))
    const dlAnchorElem = document.createElement('a')
    document.body.appendChild(dlAnchorElem)
    dlAnchorElem.setAttribute('href', dataStr)
    dlAnchorElem.setAttribute('download', 'alioth-save-data.json')
    dlAnchorElem.click()
    dlAnchorElem.remove()
  })

  const onChange = useMemoizedFn((value) => {
    // console.log(ref.current.getMentions())
  })

  const onBlur = useMemoizedFn(() => {
    console.log('example blur')
  })

  return (
    <div style={{ height: '100%' }}>
      {/* <button
        onClick={() => {
          console.log(ref.current.getValue());
        }}
      >
        getValue
      </button>
      <button
        onClick={() => {
          console.log(ref.current.getRawValue());
        }}
      >
        getRawValue
      </button>
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        focus
      </button>
      <button
        onClick={() => {
          ref.current.insertMention();
        }}
      >
        insertMention
      </button>
      <button onClick={onCommand}>command</button>
      <input type="file" onChange={onInsertImageChange} /> */}
      <LocaleContextWrapper locale='en'>
        <Editable
          mode="doc"
          ref={ref}
          onChange={onChange}
          onEvent={{
            onCopyAnchor,
            onMentionSearch,
            onTrrigerUpload,
            onDownloadAttachment,
            onPreviewAttachment,
            onTransformUrl,
            onSave,
            onBlur,
          }}
        />
      </LocaleContextWrapper>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
