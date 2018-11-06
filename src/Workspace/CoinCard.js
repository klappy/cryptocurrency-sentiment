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
        <div className={classes.chips}>
          <Chip className={classes.chip} label={
            <span>Market Cap Rank: <b>{coinObject.market_cap_rank}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>CoinGecko Rank: <b>{coinObject.coingecko_rank}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>CoinGecko Score: <b>{coinObject.coingecko_score.toFixed(2)}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>Developer Score: <b>{coinObject.developer_score.toFixed(2)}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>Community Score: <b>{coinObject.community_score.toFixed(2)}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>Liquidity Score: <b>{coinObject.liquidity_score.toFixed(2)}</b></span>
          } />
          <Chip className={classes.chip} label={
            <span>Public Interest Score: <b>{coinObject.public_interest_score.toFixed(2)}</b></span>
          } />
        </div>
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
