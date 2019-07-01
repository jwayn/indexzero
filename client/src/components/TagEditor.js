import React, { Component } from 'react';
import RenderedTag from './RenderedTag';

export default class TagEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
    }

    renderTag(name, key) {
        return <RenderedTag name={name} key={key} />;
    }

    renderTags = event => {
        let tag = event.target.value;
        if(tag.charAt(tag.length - 1) === ' ' && tag.charAt(0) !== ' ') {
            this.setState(prevState => ({
                tags: [...prevState.tags, this.renderTag(tag, this.state.tags.length)]
            }));
            event.target.value = '';
        }
    }

    render() {
        return (
            <div className="form-container__group">
                <label className="input__label">Tags</label>
                <input className="input__text-box" onChange={this.renderTags} />
                <div className="tags__rendered">
                    {this.state.tags}
                </div>
            </div>
            
        )
    }

}