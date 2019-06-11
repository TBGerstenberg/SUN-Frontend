import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import logo from "../05_images/mail_icon.png";

class NavBar extends Component {
  render() {
    return (
      <div class="ui teal large inverted segment" >
        <div class="ui large inverted secondary menu">
        <div class="ui mini image">
        <a href="Home" ><img src={logo} style={{ marginTop: "17%"}}></img></a>
        </div>
          <a href="Home" class="item" >
            Home
          </a>
          <a href="Profile" class="item">
            Profile
          </a>
          <a href="#" class="item">
            Groups
          </a>
          <div class="right menu">
            <div class="item">
              <div class="ui icon input">
                <input type="text" placeholder="Search..." />
                <i class="search link icon" />
              </div>
            </div>

            <a href="#" class="ui item">
              <i class="sign-out icon" />
              Logout
            </a>
          </div>
        </div>
        
      </div>

    );
  }
}
export default NavBar;
