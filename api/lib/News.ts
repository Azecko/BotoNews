import { NextFunction, Request, Response } from 'express';
import { fetchHackernews } from './FetchHackernews';
import { fetchGoEpfl } from './FetchGoEpfl';
import { fetchActu } from './FetchActu';
import { fetchTweets } from './FetchTweets';
import { fetchMotivQuote } from './FetchMotivQuote';
import { fetchTomHardware } from './FetchTomHardware';
import { fetchLeTemps } from './FetchLeTemps';
import { fetchWSJ } from './FetchWSJ';
import { fetchNYtimes } from './FetchNYtimes';

const news = async (req: Request, res: Response, next: NextFunction) => {
  let news: any = [];
  if (!req.params.sources) {
    let hackerNews: BotonewsItem[] = await fetchHackernews();
    let goEpfl: BotonewsItem[] = await fetchGoEpfl();
    let actus: BotonewsItem[] = await fetchActu();
    let motivquote: MotivQuoteItem[] = await fetchMotivQuote()
    let tomshardware: BotonewsItem[] = await fetchTomHardware()
    let letemps: BotonewsItem[] = await fetchLeTemps()
    let wallstreetjournal: BotonewsItem[] = await fetchWSJ()
    let newyorktimes: BotonewsItem[] = await fetchNYtimes()

    news = news.concat(hackerNews, goEpfl, actus, motivquote, tomshardware, letemps, wallstreetjournal, newyorktimes);
  } else {
    const channels = (req.params.sources.toLowerCase() as string).split(',');
    console.log(channels);

    if (channels.includes('hackernews')) {
      console.debug('  ↳ adding hackernews');
      let hackerNews: BotonewsItem[] = await fetchHackernews({number: req.params.quantity || 3});
      news = news.concat(hackerNews);
    }

    if (channels.includes('go')) {
      console.debug('  ↳ adding goepfl');
      let goEpfl: BotonewsItem[] = await fetchGoEpfl({number: req.params.quantity || 3});
      news = news.concat(goEpfl);
    }

    if (channels.includes('actu')) {
      console.debug(' ↳ adding actu');
      let actus: BotonewsItem[] = await fetchActu({number: req.params.quantity || 3});
      news = news.concat(actus);
    }

    if(channels.includes('motivationalquotes')) {
      console.debug(' ↳ adding motivational quote')
      let motivquote: MotivQuoteItem[] = await fetchMotivQuote({number: req.params.quantity || 3})
      news = news.concat(motivquote)
    }

    if(channels.includes('tomshardware')) {
      console.debug(' ↳ adding TomHardware');
      let tomshardware: BotonewsItem[] = await fetchTomHardware({number: req.params.quantity || 3});
      news = news.concat(tomshardware);
    }

    if(channels.includes('letemps')) {
      console.debug(' ↳ adding LeTemps');
      let letemps: BotonewsItem[] = await fetchLeTemps({number: req.params.quantity || 3});
      news = news.concat(letemps);
    }

    if(channels.includes('wallstreetjournal')) {
      console.debug(' ↳ adding WallStreetJournal');
      let wallstreetjournal: BotonewsItem[] = await fetchWSJ({number: req.params.quantity || 3});
      news = news.concat(wallstreetjournal);
    }

    if(channels.includes('newyorktimes')) {
      console.debug(' ↳ adding NewYorkTimes');
      let newyorktimes: BotonewsItem[] = await fetchNYtimes({number: req.params.quantity || 3});
      news = news.concat(newyorktimes);
    }

    if (channels.includes('php_ceo')) {
      console.debug(' ↳ adding php_ceo tweets');
      try {
        let php_ceo: BotonewsItem[] = await fetchTweets({ username: 'php_ceo', ...req.query });
        news = news.concat(php_ceo);
      } catch (e) {
        console.error(e);
      }
    }
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(news);
  next();
};

export default news;
