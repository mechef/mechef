import Modal from './Modal';
import * as styles from '../utils/styleVariables';
import { borderRadius, borderColor } from '../utils/styleVariables';
const ModalWithActionButton = ({
  title,
  message,
  actionTitle,
  cancelTitle,
  onAction,
  onCancel,
}) => (
  <Modal type="success" title={title} message={message} onCancel={onCancel}>
    <div className="buttonGroup">
      <button className="actionButton" onClick={onAction}>
        {actionTitle}
      </button>
      <button className="cancelButton" onClick={onCancel}>
        {cancelTitle}
      </button>
    </div>
    <style jsx>
      {`
        button {
          border-radius: ${styles.borderRadius};
          border: 1px solid ${styles.borderColor};
          margin-left: 5px;
          margin-right: 5px;
          height: 40px;
          width: 128px;
          font-size: ${styles.fontSize};
          cursor: pointer;
          font-weight: ${styles.fontWeight};
          color: ${styles.textColor};
          outline: none;
        }
        button:hover {
          border-color: ${styles.primaryColor};
          background-color: ${styles.primaryColor};
          color: ${styles.whiteColor};
        }
      `}
    </style>
  </Modal>
);

export default ModalWithActionButton;
