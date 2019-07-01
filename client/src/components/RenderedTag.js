import React, { Component } from 'react';

export default class RenderedTag extends Component {
    constructor(props) {
        super(props);
    }

    removeTag = event => {
        this.props.removeTag(this.props.index);
    }

    render() {
        return (
            <span className="rendered-tag">
                <span className="rendered-tag__name">{this.props.name}</span>
                <button className="rendered-tag__remove" title="Remove tag" onClick={this.removeTag}>
                    <svg width="12" height="12" viewBox="0 0 14 14">
                        <path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
                    </svg>
                </button>
            </span>
        )
    }

}
