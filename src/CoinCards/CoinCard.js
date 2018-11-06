import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {
  Card,
  Chip,
  CardHeader,
  CardActions,
  CardContent,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Favorite,
  Share,
  ExpandMore,
  Delete,
} from '@material-ui/icons';
import red from '@material-ui/core/colors/red';

import CoinCharts from './CoinCharts';


class CoinCard extends React.Component {
  state = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, coinObject, removeCoinId } = this.props;

    let title = coinObject.coingecko_rank + '. ' + coinObject.symbol.toUpperCase() + ' - ' + coinObject.name

    const data = {
      market_cap_rank: 'Market Cap Rank',
      coingecko_rank: 'CoinGecko Rank',
      coingecko_score: 'CoinGecko Score',
      developer_score: 'Developer Score',
      community_score: 'Community Score',
      liquidity_score: 'Liquidity Score',
      public_interest_score: 'Public Interest Score',
    };
    const chips = (
      <div className={classes.chips}>
      {
        Object.keys(data).map(key =>
          <Chip className={classes.chip} label={
            <span>{data[key]}: <b>{coinObject[key].toFixed(2)}</b></span>
          } />
        )
      }
      </div>
    );

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.listItemIcon}
              src={coinObject.image ? coinObject.image.large : ''}
              classes={{img: classes.img}}
            />
          }
          action={
            <IconButton
              onClick={()=> removeCoinId(coinObject.id)}
            >
              <Delete />
            </IconButton>
          }
          title={title}
          subheader={coinObject.genesis_date}
        />
        {chips}
        <CardContent>
          <CoinCharts coinObject={coinObject} />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="Share">
            <Share />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              Description:
            </Typography>
            <ReactMarkdown
              source={coinObject.description.en}
              escapeHtml={false}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CoinCard.propTypes = {
  classes: PropTypes.object.isRequired,
  coinObject: PropTypes.object.isRequired,
  removeCoinId: PropTypes.func.isRequired,
};

const styles = theme => ({
  card: {
    marginBottom: '1em',
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  img: {
    objectFit: 'contain',
  },
});

export default withStyles(styles)(CoinCard);
