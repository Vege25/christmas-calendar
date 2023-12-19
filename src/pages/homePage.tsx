import React, { useEffect } from 'react';
import Loading from '../components/loadingComonent';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './loginPage';
import { LoginProps } from '../interfaces/firebase';
import Header from '../components/headerComponent';
import Tweets from '../components/tweetsComponent';
import ParallaxComponent from '../components/parallaxComponent';

const Home: React.FC<LoginProps> = ({ firebase }) => {
  if (!firebase) {
    // Handle the case where firebase is not available
    return <div>Error: Firebase not available</div>;
  }

  const auth = getAuth(firebase);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      // Handle authenticated user
      // You can perform additional actions when the user is authenticated
    }
  }, [user]);

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
        <div>
          <ParallaxComponent />
          <div className='about'>
            <h2>Hyvää jouluaattoa, rakas!</h2>
            <p>
              Halusin luoda rakkaalleni jotain käsin, ja huomattuani, etten ole
              kovin taitava askartelija, päätin hyödyntää vahvinta
              osaamisaluettani: koodaamista. Tämä sivusto on siis yksi
              joululahjoistani sinulle.
            </p>
            <p>
              Selattuasi sivua alaspäin huomaat, kuinka upeita kuukausia olemme
              saaneet yhdessä kokea.
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
        <Header user={user} />
        <div className='col-12 tweets-container'>
          <Tweets firebase={firebase} />
        </div>
        <div className='col-12'>
          <div className='p-6 text-center bg-white btn-tweet'>
            <a
              href='/compose'
              className='p-4 border-2 border-solid rounded-md border-primary bg-light'
            >
              Lisää muisto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
