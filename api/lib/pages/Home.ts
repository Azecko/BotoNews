import { Request, Response } from 'express';
import { getAllSources, getAllSubscriptions, getSupportByTitle } from '../DB';
import { fetchActu } from '../FetchActu';
import { fetchGoEpfl } from '../FetchGoEpfl';
import { fetchHackernews } from '../FetchHackernews';
import { fetchMotivQuote } from '../FetchMotivQuote';
import { fetchNYtimes } from '../FetchNYtimes';
import { fetchWSJ } from '../FetchWSJ';

const home = async (req: any, res: Response) => {

  // let's set our variables
  let news:any = [];
  let user:any = {};
  let subscriptions:any = [];
  let splashPageSubscription:any = {}
  let defaultSplashPageSub = {
    "modalities": { "random": true, "number": 6},
    "sources": [ {"title": "Go"}, {"title": "Actu"} ]
  }
  let sources = await getAllSources()
  let splashPageSupport:any = await getSupportByTitle("SplashPage")

  if (req.session.passport?.user?.provider?.userid && req.user) { // User is logged in

    user = req.session.passport.user.provider
    subscriptions = await getAllSubscriptions(req.session.passport.user.provider.userid)

    if (subscriptions && subscriptions.subscriptions && Array.isArray(subscriptions.subscriptions)) {
      splashPageSubscription = subscriptions.subscriptions.find((e:any) => e.support.title === 'SplashPage')
    } else {
      splashPageSubscription = false
    }

    if (!splashPageSubscription) {
      // Set the default subscription
      splashPageSubscription = defaultSplashPageSub
    }

  } else { // User is not logged in

    splashPageSubscription = defaultSplashPageSub

  }

  let quantity = splashPageSubscription.modalities.number || 6
  for (let element of splashPageSubscription.sources) {
    // TODO: find a way to dynamically call fetch method based on element.title
    switch(element.title) {
      case "Go":
        let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: quantity});
        news = news.concat(goEpfl);
      break;
      case "Actu":
        let actu: BotonewsItem[] = await fetchActu({number: quantity});
        news = news.concat(actu);
      break;
      case "MotivationalQuotes":
        let quotes: MotivQuoteItem[] = await fetchMotivQuote({number: quantity});
        news = news.concat(quotes);
      break;
      case "WallStreetJournal":
        let wallstreetjournal: BotonewsItem[] = await fetchWSJ({number: quantity});
        news = news.concat(wallstreetjournal);
      break;
      case "HackerNews":
        let hackernews: BotonewsItem[] = await fetchHackernews({number: quantity});
        news = news.concat(hackernews);
      break;
      case "NewYorkTimes":
        let nytimes: BotonewsItem[] = await fetchNYtimes({number: quantity});
        news = news.concat(nytimes);
      break;
    }
  }
  if (splashPageSubscription.modalities?.random) {
    news = news.sort( () => Math.random() - 0.5)
  }
  res.render('homepage',  {user, subscriptions, news, splashPageSubscription, sources, splashPageSupport });
};

export default home;
