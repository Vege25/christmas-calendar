import React, { useEffect } from 'react';
import Loading from '../components/loadingComonent';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Login from './loginPage';
import { LoginProps } from '../interfaces/firebase';
import Header from '../components/headerComponent';
import Tweets from '../components/tweetsComponent';
import ParallaxComponent from '../components/parallaxComponent';
import YearWrapped from '../components/yearWrapped';

const Home: React.FC<LoginProps> = ({ firebase }) => {
  if (!firebase) {
    // Handle the case where firebase is not available
    return <div>Error: Firebase not available</div>;
  }

  const auth = getAuth(firebase);
  const [user, loading] = useAuthState(auth);
  const gift = localStorage.getItem('gift');
  const isGiftDisabled = gift === 'false' ? true : false;

  useEffect(() => {
    if (user) {
      // Check if the user's UID is not one of the allowed values
      if (
        user.uid !== 'qxR3IEwUd4aqwXUFAEe8jslJnxh1' &&
        user.uid !== 'aUF22uJVcsMwS1TY7sg31UtQVGy1'
      ) {
        // Log out the user
        signOut(auth);
        // Optionally, you can display a message or handle the case
        console.log('User not allowed. Logged out.');
        alert("User not allowed! You've been logged out.");
      } else {
        // You can perform additional actions when the user is authenticated
      }
    }
  }, [user, auth]);

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Login firebase={firebase} />;
    }
  }

  return (
    <div className='max-w-xl mx-auto container-home'>
      <div className='row'>
        {!isGiftDisabled && (
          <div>
            <ParallaxComponent />
            <div className='about'>
              <h2>Hyvää jouluaattoa, rakas!</h2>
              <p>
                Halusin luoda rakkaalleni jotain käsin, ja huomattuani, etten
                ole kovin taitava askartelija, päätin hyödyntää vahvinta
                osaamisaluettani: koodaamista. Tämä sivusto on siis yksi
                joululahjoistani sinulle.
              </p>
              <p>
                Selattuasi sivua alaspäin huomaat, kuinka upeita kuukausia
                olemme saaneet yhdessä kokea.
                <i className='pl-2 fa-regular fa-heart'></i>
              </p>
              <p>
                Olen varma, että tulemme luomaan vielä lukemattomia ihania
                muistoja yhdessä. Siksi loin meille mahdollisuuden päivittää
                muistojamme tälle sivustolle.
              </p>
              <p>Rakkaudella,</p>
              <p className='about-last-p'>~ Peepi</p>
            </div>
          </div>
        )}
        <Header user={user} isGiftDisabled={isGiftDisabled} />
        <div
          className={`col-12 tweets-container flex flex-col gap-4 ${
            isGiftDisabled ? 'mt-16' : ''
          }`}
        >
          <YearWrapped />
          <Tweets firebase={firebase} />
        </div>
        <div className='col-12'>
          <div className='p-6 text-center bg-white btn-tweet'>
            <Link
              to='/compose'
              className='p-4 border-2 border-solid rounded-md border-primary bg-light'
            >
              Lisää muisto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
