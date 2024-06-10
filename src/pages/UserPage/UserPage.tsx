import React from 'react';
import NavBar from 'components/NavBar';
import styles from './UserPage.module.scss';
import Typography from '../../components/Typography';
import Item from 'components/Item';

function UserPage() {
  return (
    <div className={styles.UserPage}>
      <div className={styles.NavBar}>
        <NavBar />
      </div>
      <Typography variant="h2">My profile</Typography>
      <div className={styles.Profile}>
      <Item
          title='Lorem Ipsum'
          image='https://spinninrecords.com/uploads/profile/images/5f/cb/54/60/5fcb5460d9754b4893bc99b383d9ed54.jpg?1624952083'
          content1='loremipsum@gmail.com'
          content2=''
          isMenuEnabled= {false}
        />
      </div>
      <div>
        <Typography variant="bodyBold">Saved Plan</Typography>
        <div className={styles.List}>
          <Item
          title='New York'
          image='https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg'
          content1='June 6, 2024 - June 10, 2024'
          content2='4 people'
          isMenuEnabled= {true}
        />
        <Item
          title='New York'
          image='https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg'
          content1='June 6, 2024 - June 10, 2024'
          content2='4 people'
          isMenuEnabled= {true}
        />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
