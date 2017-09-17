const DeliveryList = props => (
  <div>
    <div className="header">
      <span className="title">{props.title}</span>
      <div className="addButton" onClick={props.onAdd}>
        <i className="fa fa-plus plus-icon" aria-hidden="true" />
      </div>
    </div>
    {
      props.deliveryList.map(delivery => (
        <div className="delivery-list">
          <div className="delivery-item">
            <div className="delivery-content">
              <p className="delivery-title">{delivery.address}</p>
              <p className="delivery-detail">
                <span className="delivery-subtext">Shipping Cost: $300</span>
              </p>
            </div>
            <span className="update-button">
              <span className="update-button-text">UPDATE</span>
            </span>
          </div>
        </div>
      ))
    }
    <style jsx>
      {`
        .header {
          display: flex;
          align-items: center;
          padding-bottom: 22px;
        }
        .title {
          font-size: 18px;
          line-height: 1.11;
          letter-spacing: 0.5px;
          color: #4a4a4a;
        }
        .addButton {
          display: flex;
          width: 36px;
          height: 36px;
          margin-left: 20px;
          border-radius: 4px;
          background-color: #ffffff;
        }
        .plus-icon {
          margin: auto;
          color: #009245;
        }
        .addButton:hover {
          background-color: #3e9f40;
        }
        .addButton:hover .plus-icon {
          color: #ffffff;
        }
        .delivery-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 30px 20px 30px 15px;
          width: 100%;
          border-radius: 4px;
          background-color: #ffffff;
        }
        .delivery-content {
          display: flex;
          flex-direction: column;
        }
        .delivery-title {
          font-size: 16px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.7px;
          text-align: left;
          color: #4a4a4a;
        }
        .delivery-detail {
          padding-top: 16px;
        }
        .delivery-subtext {
          margin-right: 40px;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          letter-spacing: 0.6px;
          text-align: left;
          color: #9b9b9b;
        }
        .update-button {
          display: flex;
          margin-top: auto;
          margin-bottom: auto;
          width: 150px;
          height: 40px;
          border-radius: 4px;
          background-color: #3e9f40;
        }
        .update-button-text {
          margin: auto;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.14;
          color: #ffffff;
          cursor: default;
        }
        .update-button:hover, .update-button:active {
          background-color: #969696;
        }
      `}
    </style>
  </div>
);

export default DeliveryList;
