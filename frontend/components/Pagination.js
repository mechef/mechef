// @flow

import React from 'react';

type Props = {
  totalPageCount: number,
  currentPageIndex: number,
  onPageClick: (pageNumber: number) => void,
};

const Pagination = (props: Props) => (
  <div className="paginationContainer">
    {
      props.currentPageIndex > 1 ?
        <button onClick={() => { props.onPageClick(props.currentPageIndex - 1); }}>
          &laquo;
        </button>
        :
        null
    }
    {
      Array.from(Array(props.totalPageCount).keys()).map((_, index) => (
        <button
          className={`pageButton ${index === props.currentPageIndex ? 'active' : ''}`}
          onClick={() => { props.onPageClick(index); }}
        >
          {index}
        </button>
      ))
    }
    {
      props.currentPageIndex > 1 ?
        <button onClick={() => { props.onPageClick(props.currentPageIndex + 1); }}>
          &raquo;
        </button>
        :
        null
    }
    <style jsx>
      {`
        .paginationContainer {
          display: flex;
        }

        .pageButton {
          color: black;
          padding: 8px 16px;
          transition: background-color .3s;
          border: 0;
          outline: none;
          cursor: pointer;
        }

        .pageButton.active {
          background-color: #4CAF50;
          color: white;
        }
      `}
    </style>
  </div>
);

Pagination.defaultProps = {
  currentPageIndex: 1,
};

export default Pagination;
