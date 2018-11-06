import * as coinGeckoHelpers from '../helpers/CoinGeckoHelpers';
import eachLimit from 'async/eachLimit';
import moment from 'moment';

export const datasetsCharts = (id, scale) =>
  new Promise((resolve, reject) => {
    let _datasetsCharts = {};
    const _backDays = backDays(scale);
    let histories = {};
    eachLimit(_backDays, 2,
      (backDay, callback) => {
        let date = backDate(backDay);
        coinGeckoHelpers.history(id, date)
        .then(data => {
          histories[backDay] = data;
          callback();
        });
      },
      () => {
        _datasetsCharts = datasetsChartsFromHistories(histories, scale);
        resolve(_datasetsCharts);
      }
    );
  });

const backDate = (days_ago) => {
  return moment().subtract(days_ago, 'days').format('DD-MM-YYYY');
}

export const backDays = (scale) => {
  const base = [...Array(11).keys()].reverse();
  let backDaysByScale = {
    days: base,
    weeks: base.map(week => week * 7),
    months: [7,6,5,4,3,2,1,0].map(month => month * 30),
    fibonacci: [144,89,55,34,21,13,8,5,3,2,1,0],
  }
  return backDaysByScale[scale];
}

const dataTypes = () => {
  return {
    market_data: {
      current_price: {
        key: "btc",
        label: "Price - 1000 Satoshis",
        unit: 100000,
        decimals: 3,
      },
    },
    developer_data: {
      forks: {
        label: "Dev Forks",
        unit: 1,
      },
      stars: {
        label: "Dev Stars",
        unit: 1,
      },
      subscribers: {
        label: "Dev Subscribers",
        unit: 1,
      },
      pull_requests_merged: {
        label: "Dev Merged PRs",
        unit: 1,
      },
      pull_request_contributors: {
        label: "Dev PR Contributors",
        unit: 1,
      },
      commit_count_4_weeks: {
        label: "Dev Commits 4 Weeks",
        unit: 1,
      },
    },
    community_data: {
      facebook_likes: {
        label: "Facebook Likes",
        unit: 1,
      },
      twitter_followers: {
        label: "100's of Twitter Followers",
        unit: 1/100,
      },
      reddit_average_posts_48hr: {
        label: "Reddit Average Posts 48h",
        unit: 1,
      },
      reddit_average_comments_48h: {
        label: "Reddit Average Comments 48h",
        unit: 1,
      },
      reddit_subscribers: {
        label: "10's of Reddit Subscribers",
        unit: 1/10,
      },
      reddit_accounts_active_48h: {
        label: "Reddit Accounts Active 48h",
        unit: 1,
      },
    },
    public_interest_stats: {
      alexa_rank: {
        label: "Alexa Rank *1000",
        unit: 1/1000,
      },
      bing_matches: {
        label: "Bing Matches * 1000",
        unit: 1/1000,
      },
    }
  };
};

const colors = () => [
  'STEELBLUE',
  'LIMEGREEN',
  'MEDIUMORCHID',
  'CRIMSON',
  'DARKORANGE',
  'DARKTURQUOISE',
  'OLIVE',
];

const datasetsChartsFromHistories = (histories, scale) => {
  let _datasetsCharts = {};
  let _backDays = backDays(scale);
  const _dataTypes = dataTypes();
  Object.keys(_dataTypes).forEach(chartKey => {
    _datasetsCharts[chartKey] = [];
    let datasets = [];
    let _colors = colors();
    Object.keys(_dataTypes[chartKey]).forEach(lineKey => {
      let data = _backDays.map(backDay => {
        const {unit} = _dataTypes[chartKey][lineKey];
        let value = histories[backDay][chartKey][lineKey];
        const key = _dataTypes[chartKey][lineKey].key;
        if (key) value = histories[backDay][chartKey][lineKey][key];
        value = unit * Number(value);
        let fixed = 2;
        const decimals = _dataTypes[chartKey][lineKey].decimals;
        if (decimals) fixed = decimals;
        return value.toFixed(fixed);
      });
      let color = _colors.shift();
      let dataset = {
        label: _dataTypes[chartKey][lineKey].label,
        fill: false,
        data: data,
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
      };
      datasets.push(dataset);
    });
    _datasetsCharts[chartKey] = datasets;
  });
  return _datasetsCharts;
}
