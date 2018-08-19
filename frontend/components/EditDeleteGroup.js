import React from 'react';
import { transparent } from '../utils/styleVariables';

const EditDeleteGroup = ({ onEdit, onDelete }) => (
  <div className="iconWrapper">
    <button className="btn" onClick={onEdit}>
      <div className="icon editIcon" />
    </button>
    <button className="btn" onClick={onDelete}>
      <div className="icon deleteIcon" />
    </button>
    <style jsx>
      {`
        button {
          padding: 0;
        }

        .btn {
          cursor: pointer;
          background-color: ${transparent};
          border: 0;
          outline: none;
          margin-left: 30px;
        }

        .icon {
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          width: 14px;
          height: 14px;
          outline: none;
        }

        .editIcon {
          background-image: url('../static/svg/edit_icon.svg');
        }

        .deleteIcon {
          background-image: url('../static/svg/delete_icon.svg');
        }

        .btn:hover .editIcon {
          background-image: url('../static/svg/edit_icon_hover.svg');
        }
        .btn:hover .deleteIcon {
          background-image: url('../static/svg/delete_icon_hover.svg');
        }
      `}
    </style>
  </div>
);
export default EditDeleteGroup;
