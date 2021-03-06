import React, { Component } from "react";
class PostsIcon extends Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M0 9.98243C0 4.45958 4.47715 -0.0175781 10 -0.0175781H54.1667C59.6895 -0.0175781 64.1667 4.45957 64.1667 9.98242V54.1491C64.1667 59.6719 59.6895 64.1491 54.1667 64.1491H10C4.47716 64.1491 0 59.6719 0 54.1491V9.98243Z"
            fill="black"
          />
          <path
            d="M75.8334 9.98243C75.8334 4.45958 80.3105 -0.0175781 85.8334 -0.0175781H130C135.523 -0.0175781 140 4.45957 140 9.98242V54.1491C140 59.6719 135.523 64.1491 130 64.1491H85.8334C80.3105 64.1491 75.8334 59.6719 75.8334 54.1491V9.98243Z"
            fill="black"
          />
          <path
            d="M0 85.8159C0 80.2931 4.47715 75.8159 10 75.8159H54.1667C59.6895 75.8159 64.1667 80.2931 64.1667 85.8159V129.983C64.1667 135.505 59.6895 139.983 54.1667 139.983H10C4.47716 139.983 0 135.505 0 129.983V85.8159Z"
            fill="black"
          />
          <path
            d="M75.8334 86C75.8334 80.4772 80.3105 76 85.8334 76H130C135.523 76 140 80.4772 140 86V130.167C140 135.69 135.523 140.167 130 140.167H85.8334C80.3105 140.167 75.8334 135.69 75.8334 130.167V86Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="140" height="140" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
}

export default PostsIcon;
