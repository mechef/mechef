const Home = () => (
  <div className="dashboard-content__header">
    <style jsx>
      {`
        .dashboard-content__header {
          width: 100%;
          height: 240px;
          background-image: url('../static/pancake.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .dashboard-content__header:after {
          content: '';
          position: absolute;
          top: 200px;
          left: 20px;
          background-image: url('../static/avatar.jpg');
          background-size: cover;
          background-position: center;
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
      `}
    </style>
  </div>
);

export default Home;
