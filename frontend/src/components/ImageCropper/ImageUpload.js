import React, { useState } from 'react';
import ImageCropper from './ImageCropper'

import './cropper.css'

const ImageUpload = () => {
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')

  const getBlob = (blob) => {
    //function to pass the blob from inner components up to this component
    setBlob(blob)
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

  const handleSubmiitImage = (e) => {
    e.preventDefault()
    console.log(blob)
  }

  return (
    <form onSubmit={handleSubmiitImage}>
      <input
        type="file"
        accept='image/*'
        onChange={onInputChange}
      />
      {
        inputImg && (
          <ImageCropper
            getBlob={getBlob}
            inputImg={inputImg}
          />
        )
      }
      <button type="submit">Submit</button>
    </form>
  )
}

export default ImageUpload
