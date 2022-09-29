import React from "react";

export class Link extends React.Component {
    render()  {
        return <div>
            <h3>Link:</h3>
            <a href={this.props.href}>
            {this.props.text}
            </a>
            </div>
    }
}

