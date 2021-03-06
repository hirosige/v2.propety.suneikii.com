import React from 'react';
/* eslint import/no-extraneous-dependencies: 0 */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    margin: 0,
  },
};

const StyledButton = styled(Button)`
   && {
    color: #fff;
    border-bottom: 1px solid #fff;
   }
`;

const BurgerBtn = styled(IconButton)`
  && {
    margin-right: 10px;
  }
`;

class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  static getInitialProps({ props, isAuthenticated, currentUrl }) {
    return {
      props,
      isAuthenticated,
      currentUrl,
    };
  }

  handleMenu = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  render() {
    const { anchorEl } = this.state;
    const {
      isAuthenticated,
      classes,
    } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <BurgerBtn color="inherit" aria-label="Menu">
              <MenuIcon />
            </BurgerBtn>
            <Typography variant="title" color="inherit">
              SUNEIKII.
            </Typography>
            {!isAuthenticated && (
              <Link prefetch key="/auth/sign-in" href="/auth/sign-in">
                <StyledButton>Sign In</StyledButton>
              </Link>
            )}
            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <Link prefetch key="/auth/sign-in" href="/auth/sign-out">
                    <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({
      flexGrow: PropTypes.number.isRequired,
    }).isRequired,
    grow: PropTypes.shape({
      flexGrow: PropTypes.number.isRequired,
    }).isRequired,
    menuButton: PropTypes.shape({
      marginLeft: PropTypes.number.isRequired,
      marginRight: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Header);
