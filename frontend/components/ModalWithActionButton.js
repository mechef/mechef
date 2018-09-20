import Modal from './Modal';

const ModalWithActionButton = ({ title, message, onAction, onCancel }) => (
  <Modal type="warning" title={title} message={message}>
    <div className="buttonGroup">
      <button className="actionButton" onClick={onAction} />
      <button className="cancelButton" onClick={onCancel} />
    </div>
  </Modal>
);
