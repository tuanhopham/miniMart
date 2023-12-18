import QRCode from "qrcode.react";
import React, { useRef } from "react";
import {
    Button,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import * as htmlToImage from 'html-to-image';
export const QRProduct = (props) => {
    const qrCodeRef = useRef(null);

    const handleDownload = () => {
      if (qrCodeRef.current) {
        htmlToImage.toPng(qrCodeRef.current)
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'qr-code.png';
            link.click();
          })
          .catch((error) => {
            console.error('Error generating image:', error);
          });
      }
    };
  
  return (
    <div>
      <Form>
        <Modal centered isOpen={props.modal} toggle={props.toggle} size="m">
          <ModalHeader toggle={props.toggle}>
            QR code of {props.product.productName}
          </ModalHeader>
          <ModalBody style={{textAlign:"center"}}>
          <div ref={qrCodeRef}>
              <QRCode value={`https://mini-mart-six.vercel.app/qr/${props.product.id}`} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit"  onClick={handleDownload} >
              Download Qr Code Image
            </Button>
            <Button color="secondary" onClick={props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};
