import { PickerOverlay } from "filestack-react";
import { useState } from "react";
import { Form } from "react-bootstrap";

const ImageUpload = ({ setFormData }) => {
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
  const [imgFileName, setFileName] = useState("");
  const YOUR_API_KEY = "AEtU9B1JaSJytaqukN9nnz";

  const imgUploadButton = () => {
    // console.log("click");
    // event.preventDefault();
    isPickerOverlayVisible
      ? setIsPickerOverlayVisible(false)
      : setIsPickerOverlayVisible(true);
  };

  const imgUploadSuccess = (res) => {
    // setURL(res.filesUploaded[0].url);
    // console.log(res);
    // console.log(res.filesUploaded[0].filename);
    setFormData((state) => {
      setFileName(res.filesUploaded[0].filename);
      return { ...state, imgURL: res.filesUploaded[0].url };
    });
  };

  return (
    <Form.Group>
      <Form.Label className='mr-2'>
        <strong>Recipe Cover Image </strong>
      </Form.Label>
      <input type='button' value='upload image' onClick={imgUploadButton} />
      <span>{imgFileName}</span>
      {isPickerOverlayVisible && (
        <PickerOverlay
          apikey={YOUR_API_KEY}
          onSuccess={imgUploadSuccess}
          pickerOptions={{
            onClose: imgUploadButton,
            accept: ["image/*"],
            imageMax: [600, 450],
          }}
        />
      )}
    </Form.Group>
  );
};

export default ImageUpload;
