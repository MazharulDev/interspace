import React, { useState, ChangeEvent } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type ImageUploadProps = {
  name: string;
};

const UploadImage = ({ name }: ImageUploadProps) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = async (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);

    if (newFileList[0] && newFileList[0].status === "done") {
      const imgbbApiKey = process.env.REACT_APP_IMGBB_API_KEY;
      const formData = new FormData();
      formData.append("image", newFileList[0].originFileObj);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.data.url;

      console.log("Uploaded image URL:", imageUrl);
    }

    setFileList(newFileList);
  };

  return (
    <Upload
      name={name}
      fileList={fileList}
      listType="picture-circle"
      className="avatar-uploader"
      onChange={handleChange}
      beforeUpload={() => false}
    >
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default UploadImage;
