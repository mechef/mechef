import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import CheckBox from '../components/CheckBox';
import SelectBox from '../components/SelectBox';
import MenuItem from '../components/MenuItem';
import Tag from '../components/Tag';
import UploadImage from '../components/UploadImage';
import ErrorComponent from '../components/ErrorComponent';
import OrderModal from '../components/OrderModal';
import { textColor } from '../utils/styleVariables';

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
    <Link href="/delivery">
      <a>Delivery with map example</a>
    </Link>
    <CheckBox
      onChange={(isChecked) => { alert(isChecked); }}
    >
      Test123
    </CheckBox>
    <div style={{ width: '250px' }}>
      <SelectBox
        options={[{ text: '22:00', value: '22:00'}, { text: '23:00', value: '23:00' }, { text: '24:00', value: '24:00' }]}
        defaultText="24:00"
        selectedValue="24:00"
      />
    </div>
    <MenuItem
      dishName="Jasmine Honey Green Tea"
      description="Jasmine Honey Green Tea Jasmine Honey Green Tea"
      thumbnailUrl="https://source.unsplash.com/random/161x161"
      isPublish
      onTogglePublish={() => console.log('onTogglePublish')}
    />
    <Tag title="FOOD" />
    <UploadImage
      onImageUpload={(file) => {
        console.log('File:', file);
      }}
    />
    <ul>
      {
        props.shows.map(({ show }) => (
          <li key={show.id}>
            <span>{show.name}</span>
          </li>
        ))
      }
    </ul>
    <ErrorComponent
      buttonText="GO TO HOME PAGE"
      onClick={() => { alert('go to home page!'); }}
    >
      <div className="textSection">
        <h2 className="title">Hello there!</h2>
        <p className="description">This is the place to record your ingredients spendings, and a shopping list!</p>
      </div>
    </ErrorComponent>
    <OrderModal />
    <style jsx>{`
      .textSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 31px;
      }
      .title {
        font - family: 'Playball';
        font-size: 24px;
        color: ${textColor};
      }
      .description {
        width: 315px;
        display: flex;
        justify-content: center;
        line-height: 1.5;
        font-size: 16px;
        text-align: center;
        color: ${textColor};
      }
    `}</style>
  </div>
);

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  return {
    shows: data,
  };
};


export default Index;
