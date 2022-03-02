import React from 'react';
import axios from 'axios';

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await axios({
      method: "post",
      url: "http://localhost:2022/api/v1/user/cover-photo-x",
      data: {
        "filename": selectedFile.name,
        "mimetype": selectedFile.type,
        "filesize": 1000
      },
      headers: { "Content-Type": "application/json" },
    });
    const formData = new FormData();
    Object.keys(res.data.data.fields).forEach(key => formData.append(key, res.data.data.fields[key]));
    formData.append('Content-Type', selectedFile.type);
    formData.append('file', selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: res.data.data.url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
};

export default Form;