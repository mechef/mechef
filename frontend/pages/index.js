import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

const Index = props => (
  <div>
    <Link href="/about">
      <a>About Page </a>
    </Link>
    <Link href="/login">
      <a>Login Page </a>
    </Link>
    <Link href="/walkthroughMenu">
      <a>Walkthrough Menu Page </a>
    </Link>
    <Link href="/walkthroughMenuDetail">
      <a>Walkthrough Menu Detail Page </a>
    </Link>
    <ul>
      {
        props.shows.map(({ show }) => (
          <li key={show.id}>
            <span>{show.name}</span>
          </li>
        ))
      }
    </ul>
  </div>
);

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  return {
    shows: data,
  };
};

Index.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default Index;
