import React, { useState } from 'react';
import ImageCropper from './ImageCropper'

import './cropper.css'

const ImageInput = ({ aspect, onChange, width, height }) => {
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')

  const getBlob = (blob) => {
    //function to pass the blob from inner components up to this component
    setBlob(blob)
    onChange(blob)
  }

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      setInputImg(reader.result)
    }, false)

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <input
        type="file"
        accept='image/*'
        onChange={onInputChange}
      />
      <div className="image-cropper__container">
        {
          (
            <ImageCropper
              getBlob={getBlob}
              inputImg={inputImg}
              aspect={aspect}
              width={width}
              height={height}
            />
          )
        }
      </div>
    </>
  )
}

export default ImageInput
