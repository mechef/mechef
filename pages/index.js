import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <ul>
      {
        props.shows.map(({show}) => (
          <li key={show.id}>
            <span>{show.name}</span>
          </li>
        ))
      }
    </ul>
  </div>
);

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
};

export default Index;